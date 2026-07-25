import { useSyncExternalStore } from "react";

let isOpen = false;
const listeners = new Set<() => void>();

export const chatbotState = {
  isOpen: () => isOpen,
  setOpen: (val: boolean | ((prev: boolean) => boolean)) => {
    const next = typeof val === "function" ? val(isOpen) : val;
    if (next !== isOpen) {
      isOpen = next;
      listeners.forEach((l) => l());
    }
  },
  subscribe: (l: () => void) => {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
};

export function useChatbotOpen(): boolean {
  return useSyncExternalStore(
    chatbotState.subscribe,
    chatbotState.isOpen,
    chatbotState.isOpen
  );
}
