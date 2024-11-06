import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import type { InputPluginOption } from "rollup";

const plugins: InputPluginOption = [typescript(), nodeResolve(), commonjs()];

export default defineConfig([
  {
    input: "src/index.ts",
    output: [
      {
        dir: "dist/main",
        format: "cjs",
      },
    ],
    plugins,
    external: ["electron"],
  },
  {
    input: "preload/index.ts",
    output: [
      {
        dir: "dist/preload",
        format: "cjs",
      },
    ],
    plugins,
    external: ["electron"],
  },
]);
