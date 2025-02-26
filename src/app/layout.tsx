import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";

import {Roboto} from 'next/font/google'
import {MainNavigation} from "@/components/main-navigation";

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${roboto.className} overflow-y-hidden antialiased flex flex-col  bg-[#F9FAFC]`}
        >
        <MainNavigation/>
        <div className={"max-h-[calc(100vh-52px)] overflow-y-auto"}>
            <section className={"max-w-[1367px] h-full px-[86px] mx-auto py-[30px]"}>
                {children}
            </section>
        </div>
        </body>
        </html>
    );
}
