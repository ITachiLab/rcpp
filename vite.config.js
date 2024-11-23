import {defineConfig} from 'vite'
import {resolve} from 'path'
import {EsLinter, linterPlugin} from "vite-plugin-linter";

export default defineConfig(configEnv => ({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/entry.js'),
      name: 'RCpp',
      fileName: 'rcpp'
    }
  },
  plugins: [
    linterPlugin({
      include: ["./src/**/*.js"],
      linters: [new EsLinter({ configEnv: configEnv })],
    }),
  ],
}));