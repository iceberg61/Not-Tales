import "./globals.css";

import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export const metadata = {
  title: "NOT•TALES | TELL NO TALES",
  description: "Not - A clothing brand, its a lifestyle. Shop the latest jeans, clothes, and caps from NOT•TALES.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}