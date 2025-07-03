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
import { userById } from "@/firebase/user";

// Define context type
type MainContextType = {
  isLogin: boolean;
  setIsLoggedin: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const MainContext = createContext<MainContextType | undefined>(undefined);

interface IAppProvider {
  children: ReactNode;
}

const MainProvider: FC<IAppProvider> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLogin, setIsLoggedin] = useState<boolean>(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const me = await userById(user.uid);
          setIsLoggedin(true);
          setIsLoading(false);
          setUser(me);
        } else {
          setIsLoggedin(false);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoggedin(false);
        setIsLoading(false);
        console.error("Error checking authentication state:", error);
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
        setIsLoggedin,
        isLoading,
        setIsLoading,
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
