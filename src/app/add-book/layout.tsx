import Header from "@/components/ui/header";
import React, { PropsWithChildren } from "react";

type ILayoutAddBookProps = PropsWithChildren

const LayoutAddBook: React.FC<ILayoutAddBookProps> = ({ children }) => {
    return (
        <div className="w-full h-full">
            <Header title="Agregar un Libro Nuevo" />
            <div className="h-full w-full flex flex-col items-center p-2">
                {children}
            </div>
        </div>
    );
};

export default LayoutAddBook;