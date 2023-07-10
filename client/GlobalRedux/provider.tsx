import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

interface ContextProps {
  currentPath: string | null;
}

const Context = createContext<ContextProps | null>(null);

interface ProvidersProps {
  children: ReactNode;
  currentPath: string | null;
}

export function Providers({ children, currentPath }: ProvidersProps) {
  const [currentPathState, setCurrentPathState] = useState<string | null>(currentPath);
  const isServer = typeof window === 'undefined';

  useEffect(() => {
    if (!isServer) {
      setCurrentPathState(currentPath);
    }
  }, [isServer, currentPath]);

  return (
    <Provider store={store}>
      <Context.Provider value={{ currentPath: currentPathState }}>
        {children}
      </Context.Provider>
    </Provider>
  );
}

export function useCurrentPath(): string | null {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useCurrentPath must be used within a Providers component');
  }
  return context.currentPath;
}
