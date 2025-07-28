import React, { PropsWithChildren, Children } from "react";

type IFadeInFlexProps = PropsWithChildren

const FadeInFlex: React.FC<IFadeInFlexProps> = ({ children }) => {
    return (
        <div className="flex flex-col gap-2 items-center justify-center w-full">
            {Children.toArray(children).map((child, idx) =>
                <div
                    className="w-full"
                    key={idx}
                    style={{
                        opacity: 0,
                        animation: "fadeInUp 0.5s ease-out forwards",
                        animationDelay: `${idx * 100}ms`
                    }}
                >
                    {child}
                </div>
            )}
        </div>
    );
};

export default FadeInFlex;