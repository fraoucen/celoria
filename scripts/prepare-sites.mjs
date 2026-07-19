import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";

mkdirSync("dist/.openai", { recursive: true });
copyFileSync(".openai/hosting.json", "dist/.openai/hosting.json");

writeFileSync(
  "dist/server/index.js",
  'export { default } from "./index.mjs";\nexport * from "./index.mjs";\n',
);
