import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  title: "B Classy Fashion Store",
  description: "E-Commerce with Next.js ",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en" suppressHydrationWarning>
        <body className={`${outfit.className} antialiased text-gray-700`}
         cz-shortcut-listen="true" >
              <Toaster position="top-right" autoClose={5000} />
            <AppContextProvider>
              
              {children}
             
            </AppContextProvider>
        </body>
      </html>
  );
}
