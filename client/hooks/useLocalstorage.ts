import { useState } from "react";
import { useSession } from "next-auth/react";

export function useLocalStorage<T>(key: string, initialValue: T, session?: any): [T, (value: T) => void] {
    const { data: sessionData } = useSession();
    const [storedValue, setStoredValue] = useState<T>(() => {
      try {
        const item = window.localStorage.getItem(`${key}-${session?.user?.id}`);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error("Error retrieving data from localStorage:", error);
        return initialValue;
      }
    });
  
    const setValue = (value: T) => {
      try {
        setStoredValue(value);
        window.localStorage.setItem(`${key}-${session?.user?.id}`, JSON.stringify(value));
      } catch (error) {
        console.error("Error storing data in localStorage:", error);
      }
    };
  
    return [storedValue, setValue];
  }