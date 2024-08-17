import { atom } from "jotai";
import { IWebPushSubscription } from "@/interfaces/webPush";

export const webPushSubscriptionAtom = atom<{ value?: IWebPushSubscription }>({
  value: undefined,
});
