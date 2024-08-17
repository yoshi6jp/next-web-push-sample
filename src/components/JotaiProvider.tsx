"use client";
import { type ReactNode } from "react";
import { Provider } from "jotai";

export const JotaiProvider = ({ children }: { children: ReactNode }) => (
  <Provider>{children}</Provider>
);
