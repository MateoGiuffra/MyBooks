import React from "react";

interface IInfoCardProps {
    title: string | number;
    subtitle: string
}

const InfoCard: React.FC<IInfoCardProps> = ({ title, subtitle }) => {
    return (
        <article className='flex flex-col items-center justify-between rounded-[8px] border border-gray-300 p-4 w-full max-w-[112px] h-[130px]'>
            <p className='font-bold text-4xl'>{title}</p>
            <p className='text-theme-lighter text-center font-[18px] text-wrap'>{subtitle}</p>
        </article>
    );
};

export default InfoCard;