"use client";
import { ReactNode, useEffect, useRef } from "react";
import { useSetAtom } from "jotai";
import { webPushSubscriptionAtom } from "@/atoms/webPush";

const vapidPublicKey = process.env.NEXT_PUBLIC_WEB_PUSH_VAPID_KEY || "";
export const WebPushProvider = ({ children }: { children: ReactNode }) => {
  const once = useRef(false);
  const setSub = useSetAtom(webPushSubscriptionAtom);
  useEffect(() => {
    if (once.current === false) {
      once.current = true;
      if ("serviceWorker" in navigator && "PushManager" in window) {
        (async () => {
          try {
            const swReg = await navigator.serviceWorker.register("sw.js");
            const existSub = await swReg.pushManager.getSubscription();
            if (existSub) {
              setSub({ value: existSub.toJSON() as any });
            } else {
              const sub = await swReg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: vapidPublicKey,
              });
              setSub({ value: sub.toJSON() as any });
            }
          } catch (e) {
            console.error(e);
          }
        })();
      }
    }
  }, []);
  return <>{children}</>;
};
