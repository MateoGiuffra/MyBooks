import React, { PropsWithChildren } from "react";

interface ILayoutProfileProps extends PropsWithChildren {

}

const LayoutProfile: React.FC<ILayoutProfileProps> = ({ children }) => {
    return (
        <div className="h-full">
            {children}
        </div>
    );
};

export default LayoutProfile;