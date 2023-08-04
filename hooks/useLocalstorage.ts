import { useState } from "react";
import { useSession } from "next-auth/react";

// Utilidad para obtener el objeto localStorage en el navegador o una implementación alternativa en el servidor
function getLocalStorage(): Storage | null {
  try {
    if (typeof window !== "undefined") {
      return window.localStorage;
    }
  } catch (error) {
    console.error("Error getting localStorage:", error);
  }
  return null;
}

export function useLocalStorage<T>(key: string, initialValue: T, session?: any): [T, (value: T) => void] {
  const localStorage = getLocalStorage();
  const { data: sessionData } = useSession();
  const userId = session?.user?.id;

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (localStorage) {
        const item = localStorage.getItem(`${key}-${userId}`);
        return item ? JSON.parse(item) : initialValue;
      } else {
        // Handle the case when localStorage is not available (e.g., server-side rendering)
        return initialValue;
      }
    } catch (error) {
      console.error("Error retrieving data from localStorage:", error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (localStorage) {
        localStorage.setItem(`${key}-${userId}`, JSON.stringify(value));
      } else {
        // Handle the case when localStorage is not available (e.g., server-side rendering)
        console.warn("localStorage is not available, data will not be stored.");
      }
    } catch (error) {
      console.error("Error storing data in localStorage:", error);
    }
  };

  return [storedValue, setValue];
}
