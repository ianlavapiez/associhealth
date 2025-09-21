import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { dentistryConfig } from "@workspace/configs";
import { ThemeSwitcher } from "@workspace/ui/shared";

import "@workspace/ui/globals.css";

import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { Providers } from "@/components/providers";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: dentistryConfig.name,
    template: `%s - ${dentistryConfig.name}`,
  },
  description: dentistryConfig.seo.description,
  keywords: dentistryConfig.seo.keywords,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
          <ThemeSwitcher />
        </Providers>
      </body>
    </html>
  );
}
