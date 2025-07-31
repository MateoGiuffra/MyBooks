import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import React from "react";

interface IHeaderProps {
    title: string,
    ArrowBack?: React.ReactNode;
    dir?: "right" | "left";
}

const Header: React.FC<IHeaderProps> = ({ title, ArrowBack, dir = "left" }) => {
    return (
        <section className='w-full flex items-center justify-center bg-header relative h-header'>
            <div
                className='absolute flex items-center w-full h-header mx-auto'
                style={{
                    width: "fit-content",
                    [dir]: 10
                }}
            >
                {ArrowBack ?
                    ArrowBack
                    :
                    <Link href="/">
                        <ArrowLeftIcon width={24} style={{
                            fill: "var(--background-color-header-icon)"
                        }} />
                    </Link>}
            </div>
            <h2 className='font-bold text-[18px] text-header'>{title}</h2>
        </section>
    );
};

export default Header;