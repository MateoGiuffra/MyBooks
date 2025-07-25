import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import React from "react";

interface IHeaderProps {
    title: string,
    ArrowBack?: React.ReactNode;
}

const Header: React.FC<IHeaderProps> = ({ title, ArrowBack }) => {
    return (
        <section className='w-full flex items-center justify-center relative h-header'>
            {ArrowBack ?
                ArrowBack
                :
                <Link href="/" className='absolute flex top-0 item-center justify-center h-header left-5'>
                    <ArrowLeftIcon width={24} />
                </Link>}
            <h2 className='font-bold text-[18px]'>{title}</h2>
        </section>
    );
};

export default Header;