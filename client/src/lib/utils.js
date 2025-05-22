import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const colors = [
  "bg-[#717c4a57] text-[#ff805e] border-[1px] border-[#ff006faa]",
  "bg-[#ffd68a2a] text-[#ffdg0a] border-[1px] border-[#ffd68abb]",
  "bg-[#06d6a02a] text-[#86d6a8] border-[1px] border-[#06d6a0ab]",
  "bg-[#4cc9f02a] text-[#4cc9f8] border-[1px] border-[#4cc9f0bb]",
]
 export const getColor = (color) => {
  if(color >=0 && color < colors.length){
    return colors[color]
  }
  return colors[0]
};