#!user/bin/env node
"use strict";

import { execa } from "execa";

async function main() {
  await execa("node", ["scripts/package.mjs"], {
    stdio: "inherit",
  });

  await execa("electron-forge", ["make", "--skip-package"], {
    stdio: "inherit",
  });
}

main();
