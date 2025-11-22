"use client";
import { useEffect } from "react";

export function ScrollTop() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return <></>;
}
