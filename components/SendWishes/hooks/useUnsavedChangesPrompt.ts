import { useEffect } from "react";

export function useUnsavedChangesPrompt(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    window.addEventListener("beforeunload", beforeUnloadListener, {
      capture: true,
    });

    return () => {
      removeEventListener("beforeunload", beforeUnloadListener, {
        capture: true,
      });
    };
  }, [enabled]);
}

function beforeUnloadListener(event: BeforeUnloadEvent) {
  event.preventDefault();

  return (event.returnValue = "");
}
