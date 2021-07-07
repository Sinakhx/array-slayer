import esbuild from "esbuild";
import { readdirSync } from "fs";

const commonOptions = {
  target: "es2015",
  format: "esm",
  bundle: true,
  minify: true,
  sourcemap: true,
  sourcesContent: false,
};

esbuild
  .build({
    ...commonOptions,
    entryPoints: ["lib/src/arraySlayer.js"],
    outfile: "dist/index.js",
  })
  .catch(() => process.exit(1));

esbuild
  .build({
    ...commonOptions,
    entryPoints: readdirSync("lib/src/fp")
      .filter((name) => name !== "index.js")
      .map((file) => `lib/src/fp/${file}`),
    outdir: "dist/fp",
  })
  .catch(() => process.exit(1));
