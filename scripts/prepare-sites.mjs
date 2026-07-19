import { copyFileSync, existsSync, mkdirSync } from "node:fs";

mkdirSync("dist/.openai", { recursive: true });
copyFileSync(".openai/hosting.json", "dist/.openai/hosting.json");

if (!existsSync("dist/server/index.js") && existsSync("dist/server/index.mjs")) {
  copyFileSync("dist/server/index.mjs", "dist/server/index.js");
}

if (!existsSync("dist/server/index.js")) {
  throw new Error("Le point d'entrée dist/server/index.js est introuvable.");
}
