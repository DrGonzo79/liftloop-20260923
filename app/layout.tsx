import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LiftLoop — reciprocal growth planner",
  description: "Plan a transparent cross-promotion exchange between fictional indie apps."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
