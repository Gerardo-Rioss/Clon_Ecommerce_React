import { useState, useEffect } from "react";

/**
 * Custom hook: debounce un valor.
 * Útil para búsquedas en tiempo real sin saturar el estado.
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
