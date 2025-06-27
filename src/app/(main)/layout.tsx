import Header from "@/components/navigation/menubar";
import Footer from "@/components/navigation/footer";
import { Suspense } from "react";
import Loading from "./loading";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Header />
      <Suspense fallback={<Loading />}>{children}</Suspense>
      <Footer />
    </main>
  );
}
