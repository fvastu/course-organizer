import { createApp } from "../server/app.ts";

let appPromise: ReturnType<typeof createApp> | null = null;

async function getApp() {
  if (!appPromise) {
    appPromise = createApp();
  }
  return appPromise;
}

export default async function handler(req: any, res: any) {
  const app: any = await getApp();
  return app(req, res);
}
