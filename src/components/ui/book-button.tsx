import React from "react";

interface IBookButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    bgColor?: "blue" | "gray" | string,
    fontColor?: "white" | "black" | string,
    onHandleClick?: (...props: any) => void;
}

const BookButton: React.FC<IBookButtonProps> = ({ children, bgColor = "gray", fontColor = "black", onHandleClick, ...props }) => {
    const finalBgColor = bgColor === "blue" ? "#1A78E5" : bgColor === "gray" ? "#dadada" : bgColor;
    return (
        <button
            onClick={onHandleClick}
            className='hover:cursor-pointer bg-[#dadada] w-full rounded-[4px] p-1 pt-2 pb-2 font-semibold'
            style={{
                color: fontColor,
                backgroundColor: finalBgColor,
            }}
            {...props}
        >
            {children}
        </button>
    );
};

export default BookButton;