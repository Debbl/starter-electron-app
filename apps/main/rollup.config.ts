import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import type { RollupOptions } from "rollup";

function getConfigWithCommonOptions(options: RollupOptions): RollupOptions {
  return {
    plugins: [typescript(), nodeResolve(), commonjs(), terser()],
    external: ["electron"],
    watch: {
      clearScreen: false,
    },
    ...options,
  };
}

export default defineConfig([
  getConfigWithCommonOptions({
    input: "src/index.ts",
    output: [
      {
        dir: "dist/main",
        format: "cjs",
      },
    ],
  }),
  getConfigWithCommonOptions({
    input: "src/preload/index.ts",
    output: [
      {
        dir: "dist/preload",
        format: "cjs",
      },
    ],
  }),
]);
