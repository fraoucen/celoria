import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { extname, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";

mkdirSync("dist/.openai", { recursive: true });
copyFileSync(".openai/hosting.json", "dist/.openai/hosting.json");

const serverEntry = resolve("dist/server/index.js");

if (!existsSync(serverEntry) && existsSync("dist/server/index.mjs")) {
  copyFileSync("dist/server/index.mjs", serverEntry);
}

if (!existsSync(serverEntry)) {
  throw new Error("Le point d'entrée dist/server/index.js est introuvable.");
}

const vinextServer = await import(`${pathToFileURL(serverEntry).href}?build=${Date.now()}`);
const rendered = await vinextServer.default(new Request("https://facture-clair.local/"));

if (!rendered.ok) {
  throw new Error(`Le rendu statique a échoué avec le statut ${rendered.status}.`);
}

const html = await rendered.text();
const clientRoot = resolve("dist/client");
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = resolve(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

const assets = Object.fromEntries(
  walk(clientRoot)
    .filter((file) => statSync(file).isFile())
    .map((file) => {
      const pathname = `/${relative(clientRoot, file).replaceAll("\\", "/")}`;
      return [
        pathname,
        {
          body: readFileSync(file, "utf8"),
          type: mimeTypes[extname(file)] || "application/octet-stream",
        },
      ];
    }),
);

const worker = `
const HTML = ${JSON.stringify(html)};
const ASSETS = ${JSON.stringify(assets)};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const isHead = request.method === "HEAD";

    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(isHead ? null : HTML, {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-cache",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }

    const asset = ASSETS[url.pathname];
    if (asset) {
      return new Response(isHead ? null : asset.body, {
        status: 200,
        headers: {
          "Content-Type": asset.type,
          "Cache-Control": "public, max-age=31536000, immutable",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }

    return new Response("Page introuvable", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  },
};
`;

writeFileSync(serverEntry, worker);
