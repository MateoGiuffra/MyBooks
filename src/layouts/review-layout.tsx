import React, { PropsWithChildren } from "react";

type IBookReviewLayoutProps = PropsWithChildren

const BookReviewLayout: React.FC<IBookReviewLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col gap-4">
            <section className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <h2 className="font-bold text-[22px] pb-4">Tu Review</h2>
                    {children}
                </div>
            </section >
        </div >
    );
};

export default BookReviewLayout;