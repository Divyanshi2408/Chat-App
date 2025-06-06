import {create} from "zustand";
import { createAuthSlice } from "./Slices/auth-slice";

export const useAppStore = create((...a) => ({
  ...createAuthSlice(...a),
  // Add other slices here
  // Example: ...createOtherSlice(...a),
}));