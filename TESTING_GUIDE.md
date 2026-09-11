# Website V2 - Design Testing & Experimentation Guide

This is an independent sandbox version of the website where you can test different typography, font pairings, background colors, palettes, and imagery without affecting the main website.

---

## 🚀 Quick Start

To run this version:
```bash
cd "website-v2"
npm run dev
```
Open **[http://localhost:3001](http://localhost:3001)** in your browser.
*(You can run both the main site on `http://localhost:3000` and this test site on `http://localhost:3001` at the same time).*

---

## 🎨 1. How to Test Background Colors & Color Palettes

All global color tokens are located in:
📁 **`website-v2/app/globals.css`**

### Key Variables in `:root`:
```css
:root {
  /* Main Background Color */
  --palette-light: #DFD6CD;   /* ← Change for main background (e.g. #F4F1EA, #1E1E1E, #EFECE6) */
  
  /* Text & Accent Colors */
  --palette-medium: #9A8E84;  /* ← Secondary text/borders */
  --palette-dark: #6A5A49;    /* ← Main body text */
  --palette-deep: #372E24;    /* ← Headings / Deep accents */
  --accent: #B08E68;          /* ← Highlight / button accents */
}
```

### Body Background (`website-v2/app/layout.tsx`):
In `website-v2/app/layout.tsx`, check the `<body>` className:
```tsx
<body className={`${cormorant.variable} ${montserrat.variable} ${greatVibes.variable} antialiased bg-[#DFD6CD] text-[#6A5A49] font-sans`}>
```

---

## 🔤 2. How to Test Fonts (Google Fonts)

Fonts are imported and defined in:
📁 **`website-v2/app/layout.tsx`**

You can import any Google Font using `next/font/google`:

### Example Font Pairings:

1. **Modern Minimalist (Inter + Playfair Display)**:
```tsx
import { Playfair_Display, Inter, Dancing_Script } from "next/font/google";

const serifFont = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sansFont = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});
```

2. **Current Default**:
- **Serif**: `Cormorant_Garamond` (`--font-serif`)
- **Sans**: `Montserrat` (`--font-sans`)
- **Script**: `Great_Vibes` (`--font-script`)

---

## 🖼️ 3. How to Test Images & Hero Banners

### Static Images & Media:
All image files are stored in:
📁 **`website-v2/public/`**

- Hero banners and homepage images: `public/projects/`, `public/raw-canvas/`, etc.
- To swap an image, drop your new image file into `public/` and update the image reference.

### Page Data & Project Images:
- **Projects listing & details**: `website-v2/data/projects.ts`
- **Homepage Sections**: `website-v2/app/page.tsx`
- **About Page**: `website-v2/app/about/page.tsx`

---

## 🛠️ Summary of Key Files for Testing

| Customization | File Location |
| :--- | :--- |
| **Fonts** | `website-v2/app/layout.tsx` |
| **Colors & CSS Variables** | `website-v2/app/globals.css` |
| **Homepage Layout & Images** | `website-v2/app/page.tsx` |
| **Navigation & Header** | `website-v2/components/Navbar.tsx` |
| **Footer** | `website-v2/components/Footer.tsx` |
| **Project Data** | `website-v2/data/` |
| **Media Assets** | `website-v2/public/` |
