import type { ForgeConfig } from "@electron-forge/shared-types";

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    osxSign: {},
    ignore: (path) => {
      if (path === "") return false;

      const keepPaths = ["/dist", "/package.json"];

      return !keepPaths.some((keepPath) => path.startsWith(keepPath));
    },
  },
  makers: [
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
      config: {},
    },
  ],
};

export default config;
