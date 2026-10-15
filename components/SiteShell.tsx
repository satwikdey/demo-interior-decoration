"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Navbar as DesktopNavbar } from "./versions/desktop/Navbar";
import { Footer as DesktopFooter } from "./versions/desktop/Footer";
import { ResponsiveVersion } from "./ResponsiveVersion";
export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return <><DesktopNavbar />{children}<DesktopFooter /></>;
  return <div className="mobile-v2">
    <ResponsiveVersion mobile={<><Navbar variant={pathname === "/raw-canvas" ? "raw-canvas" : "studio"} /><div className="site-header-spacer" aria-hidden="true" /></>} desktop={<DesktopNavbar />} />
    {children}
    <ResponsiveVersion mobile={<Footer />} desktop={<DesktopFooter />} />
  </div>;
}
