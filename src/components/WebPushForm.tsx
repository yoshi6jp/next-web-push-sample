"use client";
import { useCallback, useState, ChangeEvent } from "react";
import { Button, Input, Badge } from "rsc-daisyui";
import { useAtomValue } from "jotai";
import { webPushSubscriptionAtom } from "@/atoms/webPush";

export const WebPushForm = () => {
  const { value } = useAtomValue(webPushSubscriptionAtom);
  const [message, setMessage] = useState("");
  const [delaySec, setDelaySec] = useState(0);
  const handleClick = useCallback(async () => {
    await fetch("/api/push", {
      method: "POST",
      body: JSON.stringify({ ...value, message, delaySec }),
    });
  }, [value, message, delaySec]);
  const handleMessage = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setMessage(evt.target.value || "");
    },
    [setMessage]
  );
  const handleDelaySec = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setDelaySec(Number(evt.target.value || "0") || 0);
    },
    [setDelaySec]
  );

  if (value) {
    return (
      <div>
        <div className="flex gap-2 m-2">
          <Input.Inside
            start={<Badge color="primary">通知メッセージ</Badge>}
            placeholder="テキスト"
            onChange={handleMessage}
          />
          <Input.Inside
            start={<Badge color="info">遅延時間</Badge>}
            type="number"
            min={0}
            max={60}
            end="秒"
            onChange={handleDelaySec}
          />
          <Button color="primary" onClick={handleClick}>
            登録
          </Button>
        </div>
      </div>
    );
  } else {
    null;
  }
};
