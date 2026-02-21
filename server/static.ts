import express, { type Application } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Application) {
  const candidatePaths = [
    path.resolve(process.cwd(), "dist/public"),
    path.resolve(__dirname, "public"),
  ];
  const distPath = candidatePaths.find((entry) => fs.existsSync(entry));

  if (!distPath) {
    throw new Error(
      `Could not find the build directory. Checked: ${candidatePaths.join(", ")}`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("/{*path}", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
