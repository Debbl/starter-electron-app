#!/usr/bin/env tsx

import { execa } from "execa";

async function main() {
  await execa("tsx", ["scripts/package.mts"], {
    stdio: "inherit",
  });

  await execa("electron-forge", ["make", "--skip-package"], {
    stdio: "inherit",
  });
}

main();
