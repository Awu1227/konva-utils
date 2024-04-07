import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["src/index"],
  clean: true,
  rollup: {
    inlineDependencies: true,
    esbuild: {
      target: "ES6",
      minify: true,
    },
  },
  alias: {
  },
  failOnWarn: false,
  hooks: {
    "rollup:options"(ctx, options) {
      options.plugins = [options.plugins];
    },
  },
});
