import { MakerZIP } from "@electron-forge/maker-zip";
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
  makers: [new MakerZIP({}, ["darwin"])],
};

export default config;
