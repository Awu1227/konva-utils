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
  failOnWarn: false,
  declaration: true,
});
