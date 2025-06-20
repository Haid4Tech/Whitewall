import { ReactNode } from "react";
import MainProvider from "./main-provider";

interface Props {
  children: ReactNode;
}

export default function AppLayout({ children }: Props) {
  return <MainProvider>{children}</MainProvider>;
}
