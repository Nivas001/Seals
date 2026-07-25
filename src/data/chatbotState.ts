import { useSyncExternalStore } from "react";

let isOpen = false;
let pendingQuery: string | null = null;
const listeners = new Set<() => void>();

export const chatbotState = {
  isOpen: () => isOpen,
  getPendingQuery: () => pendingQuery,
  clearPendingQuery: () => {
    pendingQuery = null;
  },
  setOpen: (val: boolean | ((prev: boolean) => boolean)) => {
    const next = typeof val === "function" ? val(isOpen) : val;
    if (next !== isOpen) {
      isOpen = next;
      listeners.forEach((l) => l());
    }
  },
  askQuestion: (query: string) => {
    pendingQuery = query;
    if (!isOpen) {
      isOpen = true;
    }
    listeners.forEach((l) => l());
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
