import { NextUIProvider } from "@nextui-org/react";
import { domMax, LazyMotion } from "motion/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider className="h-full">
      <LazyMotion features={domMax}>{children}</LazyMotion>
    </NextUIProvider>
  );
}
