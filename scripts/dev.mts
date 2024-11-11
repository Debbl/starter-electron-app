#!/usr/bin/env tsx

import path from "node:path";
import chokidar from "chokidar";
import { execa } from "execa";
import { copyDir } from "./utils/index.mts";
import { logger } from "./utils/logger.mts";

// eslint-disable-next-line n/prefer-global/process
const CWD = process.cwd();

function startElectron() {
  return execa("electron", ["."], {
    stdio: "inherit",
  });
}

async function main() {
  logger.info("Preparing build for start electron...");
  await execa("turbo", ["build", "--filter", "@starter-electron-app/main"]);

  await copyDir("apps/main/dist", "dist");
  logger.info("Prebuild done and copied apps/main/dist to dist");

  logger.info("Starting dev electron...");

  let mainProcess = startElectron();
  const watcher = chokidar.watch(path.join(CWD, "apps/main/dist"));

  execa("turbo", ["dev"], {
    stdio: "inherit",
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));
  logger.info("Starting watch the main process...");
  // FIXME skip first two events
  let skip = 0;
  watcher.on("change", async () => {
    if (skip < 2) {
      skip++;
      return;
    }

    await copyDir("apps/main/dist", "dist");

    logger.info("Rebuilding main process...");

    mainProcess.kill("SIGINT");
    mainProcess = startElectron();
  });
}

main();
