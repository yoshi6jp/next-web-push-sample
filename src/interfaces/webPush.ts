export type IWebPushSubscription = {
  endpoint: string;
  keys: {
    auth: string;
    p256dh: string;
  };
};
export type IWebPushData = IWebPushSubscription & {
  message: string;
  delaySec: number;
};
