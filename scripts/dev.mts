#!/usr/bin/env tsx

/* eslint-disable n/prefer-global/process */
import path from "node:path";
import chokidar from "chokidar";
import { execa } from "execa";
import { waitForPort } from "get-port-please";
import { copyDir } from "./utils/index.mts";
import { logger } from "./utils/logger.mts";
import type { ResultPromise } from "execa";

const CWD = process.cwd();

function buildMain() {
  return execa("pnpm", ["--filter", "@repo/main", "build"], {
    stdio: "inherit",
  });
}

function startMainProcess() {
  const child = execa("electron", ["."], {
    stdio: "inherit",
    detached: true,
  });
  // unref so the main process can exit independently of the child process
  child.unref();

  return child;
}

function startRendererProcess() {
  const child = execa("pnpm", ["--filter", "@repo/renderer", "dev"], {
    stdio: "inherit",
  });
  child.on("close", () => {
    process.exit(0);
  });

  return child;
}

async function main() {
  logger.info("Preparing build for start electron...");
  await buildMain();

  await copyDir("apps/main/dist", "dist");
  logger.info("Prebuild done and copied apps/main/dist to dist");

  logger.info("Starting dev electron...");

  let mainProcess: ResultPromise | null;
  let rendererProcess: ResultPromise | null;
  const watcher = chokidar.watch(path.join(CWD, "apps/main/src"));

  function killWholeProcess() {
    watcher?.close();

    mainProcess?.kill();
    rendererProcess?.kill();
  }

  process.on("SIGINT", killWholeProcess);
  process.on("SIGTERM", killWholeProcess);
  process.on("exit", killWholeProcess);

  rendererProcess = startRendererProcess();

  const port = 3000;
  // delay (20 * 500 = 10_000)ms to load for next server is ready
  waitForPort(port, { delay: 500, retries: 20 })
    .then(() => {
      mainProcess = startMainProcess();
    })
    .catch(() => {
      throw new Error(`Failed to start the renderer server on port ${port}`);
    });

  watcher.on("change", async () => {
    mainProcess?.kill();

    await buildMain();
    await copyDir("apps/main/dist", "dist");

    mainProcess = startMainProcess();
  });
}

main();
