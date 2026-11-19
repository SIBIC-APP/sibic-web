import type { Metadata } from "next";
import type { ReactNode } from "react";

const description =
  "Explora tus ideas y comprende las diferentes posturas políticas. Es un punto de partida, no una afiliación.";

export const metadata: Metadata = {
  title: "Mi Brújula",
  description,
  openGraph: {
    title: "Mi Brújula · SIBIC",
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mi Brújula · SIBIC",
    description,
    images: ["/opengraph-image"],
  },
};

export default function CompassLayout({ children }: { children: ReactNode }) {
  return children;
}
