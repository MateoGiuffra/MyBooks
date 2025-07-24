import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

interface IFormPageLayoutProps extends PropsWithChildren {
    title: string
    footerText: string,
    href: string
}

const FormPageLayout: React.FC<IFormPageLayoutProps> = ({ children, title, footerText, href }) => {
    return (
        <div className='w-full flex flex-col items-center'>
            <section className='w-full flex items-center justify-center relative h-header'>
                <Link href="/" className='absolute flex top-0 item-center justify-center h-header left-5'>
                    <ArrowLeftIcon width={24} />
                </Link>
                <h2 className='font-bold text-[18px]'>{title}</h2>
            </section>
            {children}
            <section className="absolute bottom-1 z-1 bg-theme w-full flex items-center justify-center flex-col h-footer text-neutral-600 ">
                <Link href={href} className="flex gap-2 underline">
                    <p>
                        {footerText}
                    </p>
                </Link >
            </section >
        </div >
    );
};

export default FormPageLayout;