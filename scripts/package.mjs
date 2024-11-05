#!/usr/bin/env node
"use strict";

import fs from "node:fs";
import path from "node:path";
import { execa } from "execa";
import { logger } from "./logger.mjs";

function copy(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

async function main() {
  // delete dist directory
  fs.rmSync("dist", { recursive: true, force: true });
  logger.info("Deleted dist directory");

  // copy dist files from apps/main and apps/renderer
  copyDir("apps/main/dist", "dist/main");
  logger.info("Copied apps/main/dist to dist/main");

  copyDir("apps/renderer/out", "dist/renderer");
  logger.info("Copied apps/renderer/out to dist/renderer");

  // exec electron-forge package
  logger.info("Running electron-forge package");
  execa("electron-forge", ["package"], { stdio: "inherit" });
}

main();
