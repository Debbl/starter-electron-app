#!user/bin/env node
"use strict";

import { execa } from "execa";
import { copyDir } from "./utils/index.mjs";
import { logger } from "./utils/logger.mjs";

async function main() {
  logger.info("Preparing build for start electron...");
  await execa("turbo", ["build", "--filter", "@starter-electron-app/main"]);

  copyDir("apps/main/dist", "dist/main");
  logger.info("Prebuild done and copied apps/main/dist to dist/main");

  logger.info("Starting dev electron...");
  execa("electron", ["."], {
    stdio: "inherit",
  });
  execa("turbo", ["dev"], {
    stdio: "inherit",
  });
}

main();
