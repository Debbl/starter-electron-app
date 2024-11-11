#!/usr/bin/env tsx
/* eslint-disable n/prefer-global/process */

import path from "node:path";
import chokidar from "chokidar";
import { execa } from "execa";
import { copyDir } from "./utils/index.mts";
import { logger } from "./utils/logger.mts";

const CWD = process.cwd();

function buildMain() {
  return execa("pnpm", ["--filter", "@starter-electron-app/main", "build"], {
    stdio: "inherit",
  });
}

function startMainProcess() {
  return execa("electron", ["."], {
    stdio: "inherit",
  });
}

function startRendererProcess() {
  return execa("pnpm", ["--filter", "@starter-electron-app/renderer", "dev"], {
    stdio: "inherit",
  });
}

async function main() {
  logger.info("Preparing build for start electron...");
  await buildMain();

  await copyDir("apps/main/dist", "dist");
  logger.info("Prebuild done and copied apps/main/dist to dist");

  logger.info("Starting dev electron...");

  let mainProcess = startMainProcess();
  const rendererProcess = startRendererProcess();

  process.on("SIGINT", killWholeProcess);
  process.on("SIGTERM", killWholeProcess);
  process.on("exit", killWholeProcess);

  const watcher = chokidar
    .watch(path.join(CWD, "apps/main/src"))
    .on("change", async () => {
      mainProcess.kill();

      await buildMain();
      await copyDir("apps/main/dist", "dist");

      mainProcess = startMainProcess();
    });

  function killWholeProcess() {
    watcher?.close();

    mainProcess?.kill();
    rendererProcess?.kill();
  }
}

main();
