import { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from "react";

interface AppContextType {
  isClick: boolean;
  setIsClick: Dispatch<SetStateAction<boolean>>;
  activeSection: string;
  setActiveSection: Dispatch<SetStateAction<string>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [isClick, setIsClick] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  return (
    <AppContext.Provider
      value={{
        isClick,
        setIsClick,
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }

  return context;
}
