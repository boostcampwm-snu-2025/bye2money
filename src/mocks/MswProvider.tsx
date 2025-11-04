import { useEffect, useState } from "react";
import { initMsw } from "./index";

interface MswProviderProps {
  children: React.ReactNode;
}

export const MswProvider = ({ children }: MswProviderProps) => {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    initMsw().then(() => {
      setMswReady(true);
    });
  }, []);

  if (!mswReady) {
    return <div>Initializing MSW...</div>;
  }

  return <>{children}</>;
};
