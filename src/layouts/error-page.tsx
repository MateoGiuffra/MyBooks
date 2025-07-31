import Header from "@/components/ui/header";
import React from "react";
import Image from "next/image";
import Link from "next/link";
interface IErrorPageLayoutProps {
    title: string,
    subtitle: string
}

const ErrorPageLayout: React.FC<IErrorPageLayoutProps> = ({ title, subtitle }) => {
    return (
        <>
            <Header title={title} />
            <div className='w-full flex flex-col  items-center'>
                <div className='w-full flex flex-col items-center gap-4 max-w-[358]'>
                    <Image
                        src="/images/error-page.png"
                        alt='404'
                        width={358}
                        height={201}
                    />
                    <div className='w-full flex flex-col gap-2'>
                        <h2 className='w-full flex justify-center text-[18px] font-bold'>Oops! {title}</h2>
                        <section className='w-full flex flex-col items-center justify-center'>
                            <p className='font-medium text-center'>{subtitle}</p>
                        </section>
                    </div>
                    <Link href="/" className='bg-[#c5d9f7] font-bold p-[8px] pr-[12px] pl-[12px] rounded-[24px]'>
                        Volver al Home
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ErrorPageLayout;