import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { CssBaseline } from "@mui/material";
import { Outfit, Inter } from "next/font/google";
import ClientProviders from "../components/ClientProviders";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Excollo",
  description: "Outcome driven innovation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} ${inter.variable}`}>
        <AppRouterCacheProvider options={{ key: "mui" }}>
          <CssBaseline />
          <ClientProviders>{children}</ClientProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
