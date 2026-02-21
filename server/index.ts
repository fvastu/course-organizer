import { createServer } from "http";
import { createApp, log } from "./app";

async function start() {
  const app = await createApp();
  const httpServer = createServer(app);

  if (process.env.NODE_ENV !== "production") {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
