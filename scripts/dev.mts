#!/usr/bin/env tsx

/* eslint-disable n/prefer-global/process */
import path from "node:path";
import chokidar from "chokidar";
import { execa } from "execa";
import { copyDir } from "./utils/index.mts";
import { logger } from "./utils/logger.mts";
import type { ResultPromise } from "execa";

const CWD = process.cwd();

function buildMain() {
  return execa("pnpm", ["--filter", "@starter-electron-app/main", "build"], {
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
  const child = execa(
    "pnpm",
    ["--filter", "@starter-electron-app/renderer", "dev"],
    {
      stdio: "inherit",
    },
  );
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

  mainProcess = startMainProcess();
  rendererProcess = startRendererProcess();
  watcher.on("change", async () => {
    mainProcess?.kill();

    await buildMain();
    await copyDir("apps/main/dist", "dist");

    mainProcess = startMainProcess();
  });
}

main();
