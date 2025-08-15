import { Footer } from "@/components/Footer";
import { NavigationBar } from "@/components/NavigationBar";
import type { Metadata } from "next";
import "./global.css";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "Star trek",
  description: "Application for working with stapiAPI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div
          className="container mx-auto p-3 flex flex-col gap-3 h-full"
          data-testid="app-wrapper"
        >
          <main
            className="bg-blue-50 rounded-2xl p-3 flex flex-col gap-2 grow dark:bg-stone-800"
            data-testid="app-main-container"
          >
            <StoreProvider>
              <NavigationBar />
              {children}
            </StoreProvider>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
