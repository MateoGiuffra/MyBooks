import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import "./globals.css";
import Footer from "@/components/ui/footer";

const newsreader = Newsreader({
    variable: "--font-newsreader",
    subsets: ["latin"],
});


export const metadata: Metadata = {
    title: "My Books",
    description: "Página personal para reseñar libros",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                cz-shortcut-listen="true"
                className={`${newsreader.variable} ${newsreader.variable} antialiased flex flex-col w-full h-full justify-between`}
            >
                <div className="h-full w-full">
                    {children}
                </div>
                <Footer />
                <div className="h-[80px] bg-theme"></div>
            </body>
        </html>
    );
}
