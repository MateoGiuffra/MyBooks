import React, { PropsWithChildren } from "react";

type ILayoutProfileProps = PropsWithChildren

const LayoutProfile: React.FC<ILayoutProfileProps> = ({ children }) => {
    return (
        <div className="h-full">
            {children}
        </div>
    );
};

export default LayoutProfile;