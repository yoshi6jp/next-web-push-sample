import webPush from "web-push";
import { IWebPushData } from "@/interfaces/webPush";

const publicKey = process.env.NEXT_PUBLIC_WEB_PUSH_VAPID_KEY || "";
const privateKey = process.env.WEB_PUSH_PRIVATE_VAPID_KEY || "";
webPush.setVapidDetails("mailto:web-push@example.com", publicKey, privateKey);

export async function POST(request: Request) {
  const { message, delaySec, ...sub }: IWebPushData = await request.json();
  await new Promise<void>((resolve) => {
    setTimeout(async () => {
      const result = await webPush.sendNotification(sub, message);
      console.log(result);
      resolve();
    }, delaySec * 1000);
  });
  return Response.json({ ok: true });
}
