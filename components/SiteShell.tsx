"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Navbar } from "./Navbar";
const LegacyNavbar = dynamic(() => import("./LegacyNavbar").then(module => module.LegacyNavbar));
import { Footer } from "./Footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) {
    return <><LegacyNavbar />{children}<Footer /></>;
  }
  return (
      <div className="mobile-v2" data-site-version="mobile-v2">
        <Navbar variant={pathname === "/raw-canvas" ? "raw-canvas" : "studio"} />
        <div className="site-header-spacer" aria-hidden="true" />
        {children}
        <Footer />
      </div>
  );
}
