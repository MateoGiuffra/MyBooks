import type { Metadata } from "next";
import { Inter, DM_Serif_Text } from "next/font/google";
import "./globals.css";
import Footer from "@/components/ui/footer";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});
const dm_serif_text = DM_Serif_Text({
    variable: "--font-dm_serif_text",
    subsets: ["latin"],
    weight: "400",
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
                className={`${inter.variable} ${inter.variable} antialiased flex flex-col w-full h-full justify-between`}
                id="dark"
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
