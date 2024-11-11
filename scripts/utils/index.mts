import fs from "node:fs/promises";
import path from "node:path";

async function copy(src: string, dest: string) {
  const stat = await fs.stat(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    await fs.copyFile(src, dest);
  }
}

export async function copyDir(srcDir: string, destDir: string) {
  await fs.mkdir(destDir, { recursive: true });
  for (const file of await fs.readdir(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    await copy(srcFile, destFile);
  }
}
