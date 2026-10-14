"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const studioLinks = [
  { href: "/", label: "Home" }, { href: "/projects", label: "Portfolio" },
  { href: "/raw-canvas", label: "Raw Canvas" }, { href: "/collaborations", label: "Collaboration" },
  { href: "/about", label: "About Us" }, { href: "/contact", label: "Contact Us" },
];
const rawLinks = [studioLinks[0], studioLinks[1], studioLinks[2], { href: "/journal", label: "Journal" }, studioLinks[4], studioLinks[5]];

export function Navbar({ variant = "studio" }: { variant?: "studio" | "raw-canvas" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const links = variant === "raw-canvas" ? rawLinks : studioLinks;
  const logo = variant === "raw-canvas" ? "/raw-canvas-logo.png" : "/logo.png";
  const brand = variant === "raw-canvas" ? "Raw Canvas" : "Design One Studio";

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1280px)");
    const closeDesktop = () => { if (query.matches) setOpen(false); };
    query.addEventListener("change", closeDesktop);
    return () => query.removeEventListener("change", closeDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = () => Array.from(panel.current?.querySelectorAll<HTMLElement>('a[href], button, [tabindex="0"]') ?? []);
    focusable()[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setOpen(false); }
      if (event.key !== "Tab") return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      if (!window.matchMedia("(min-width: 1280px)").matches) toggle.current?.focus();
    };
  }, [open]);

  return (
    <>
      <header className={"v2-header" + (scrolled ? " is-scrolled" : "")}>
        <div className="site-container v2-header-inner">
          <Link href="/" aria-label={brand + " home"} className="v2-brand">
            <Image src={logo} alt={brand} fill sizes="(max-width: 1279px) 50vw, 256px" className="object-contain object-left brightness-0 invert" />
          </Link>
          <nav className="v2-desktop-nav" aria-label="Main navigation">
            {links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>)}
          </nav>
          <button ref={toggle} type="button" className="v2-menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="v2-navigation-panel" onClick={() => setOpen(!open)}>
            {open ? <X aria-hidden="true" size={24} /> : <Menu aria-hidden="true" size={24} />}
          </button>
        </div>
      </header>
      {open && <>
        <div className="v2-menu-backdrop" aria-hidden="true" onClick={() => setOpen(false)} />
        <div ref={panel} id="v2-navigation-panel" className="v2-menu-panel" role="dialog" aria-modal="true" aria-label={brand + " navigation"}>
          <div className="v2-menu-heading"><span>{brand}</span><button type="button" onClick={() => setOpen(false)} aria-label="Close navigation"><X size={24} aria-hidden="true" /></button></div>
          <nav aria-label="Mobile navigation">
            {links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={() => setOpen(false)}>{link.label}<span aria-hidden="true">↗</span></Link>)}
          </nav>
          <Link href="/contact" className="v2-cta v2-cta-dark" onClick={() => setOpen(false)}>Inquire Now</Link>
        </div>
      </>}
    </>
  );
}
