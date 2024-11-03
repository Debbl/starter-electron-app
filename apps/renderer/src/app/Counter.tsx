"use client";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <Button onClick={() => setCount(count + 1)}>Hi {count}</Button>;
}
