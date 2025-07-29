import Header from "@/components/ui/header";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

interface IFormPageLayoutProps extends PropsWithChildren {
    title: string
    footerText: string,
    href: string,
    hideFooter?: boolean
}

const PageLayout: React.FC<IFormPageLayoutProps> = ({ children, title, footerText, href, hideFooter = true }) => {
    return (
        <div className='w-full flex flex-col items-center'>
            <Header title={title} />
            {children}
            {hideFooter &&
                <section className="mb-15 absolute bottom-1 z-1 bg-theme w-full flex items-center justify-center flex-col h-footer text-theme-lighter ">
                    <Link href={href} className="flex gap-2 underline">
                        <p className="text-black">
                            {footerText}
                        </p>
                    </Link >
                </section >
            }
        </div >
    );
};

export default PageLayout;