import { m } from "~/lib/motion";
import Counter from "./Counter";
import IPC from "./IPC";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-y-4">
      <m.div
        whileHover={{ scale: 1.1, rotate: "360deg" }}
        className="size-16 rounded-md border bg-blue-600"
      />
      <Counter />
      <IPC />
    </main>
  );
}
