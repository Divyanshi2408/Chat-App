import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge Tailwind class strings safely
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Color styles for avatars or tags
export const colors = [
  "bg-[#717c4a57] text-[#ff805e] border border-[#ff006faa]",
  "bg-[#ffd68a2a] text-[#ffda0a] border border-[#ffd68abb]",
  "bg-[#06d6a02a] text-[#86d6a8] border border-[#06d6a0ab]",
  "bg-[#4cc9f02a] text-[#4cc9f8] border border-[#4cc9f0bb]",
];

// Get a color class string from index
export const getColor = (index) => {
  return index >= 0 && index < colors.length ? colors[index] : colors[0];
};
