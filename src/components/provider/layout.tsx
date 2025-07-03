import { ReactNode } from "react";
import MainProvider from "./main-provider";
// import SpeedTest from "@cloudflare/speedtest";

interface Props {
  children: ReactNode;
}

export default function AppLayout({ children }: Props) {
  return <MainProvider>{children}</MainProvider>;
}
