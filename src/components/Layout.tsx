import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AnnouncementBar } from "./AnnouncementBar";
import { CartDrawer } from "./CartDrawer";
import { EmailPopup } from "./EmailPopup";
import { ChatWidget } from "./ChatWidget";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <EmailPopup />
      <ChatWidget />
    </div>
  );
}
