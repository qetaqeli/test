"use client";

import * as React from "react";

export function Select({ children }: { children: React.ReactNode }) {
  return <div className="relative w-full">{children}</div>;
}

export function SelectTrigger({ children }: { children: React.ReactNode }) {
  return (
    <button className="w-full rounded-md border border-gray-700 bg-black px-4 py-2 text-left text-white">
      {children}
    </button>
  );
}

export function SelectValue({ placeholder }: { placeholder: string }) {
  return <span className="text-white">{placeholder}</span>;
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return <ul className="absolute z-10 mt-1 w-full rounded-md bg-black border border-gray-700">{children}</ul>;
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <li
      className="cursor-pointer px-4 py-2 text-white hover:bg-green-500 hover:text-black"
      onClick={() => console.log("Selected:", value)}
    >
      {children}
    </li>
  );
}
