import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  clean: true,
  sourcemap: false,
  minify: false,
  splitting: false,
  treeshake: true,
  external: ["react", "react-dom"],
  target: "es2020",
});
