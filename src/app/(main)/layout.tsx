import Header from "@/components/navigation/menubar";
import Footer from "@/components/navigation/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div>
        <Header />
        <div>{children}</div>
      </div>
      <Footer />
    </main>
  );
}
