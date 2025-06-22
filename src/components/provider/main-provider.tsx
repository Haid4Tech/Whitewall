"use client";

import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  FC,
  ReactNode,
  useEffect,
} from "react";
import { auth } from "@/config/firebase";
import { User } from "@/common/types";

// Define context type
type MainContextType = {
  isLogin: boolean;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const MainContext = createContext<MainContextType | undefined>(undefined);

interface IAppProvider {
  children: ReactNode;
}

const MainProvider: FC<IAppProvider> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLoggedin] = useState<boolean>(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          setIsLoggedin(true);
        } else {
          setIsLoggedin(false);
        }
      } catch (error) {
        setIsLoggedin(false);
        throw new Error("Error logging in");
      }
    });
  }, [user]);

  return (
    <MainContext.Provider
      value={{
        user,
        setUser,
        isLogin,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMainContext must be used within a MainProvider");
  }
  return context;
};

export default MainProvider;
