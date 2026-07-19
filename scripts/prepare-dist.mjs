import { cpSync, existsSync, rmSync } from "node:fs";

if (!existsSync("out")) {
  throw new Error("Le dossier d’export statique « out » est introuvable.");
}

rmSync("dist", { recursive: true, force: true });
cpSync("out", "dist", { recursive: true });
