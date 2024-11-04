import type { ForgeConfig } from "@electron-forge/shared-types";

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    osxSign: {},
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
