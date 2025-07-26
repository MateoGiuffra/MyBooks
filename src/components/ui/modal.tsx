import React, { PropsWithChildren } from "react";

interface IModalProps extends PropsWithChildren {
    show: boolean,
    closeModal: () => void;
}

const Modal: React.FC<IModalProps> = ({ children, closeModal, show }) => {
    return (
        <>
            {show &&
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white p-6 rounded-xl shadow-lg z-[10000]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                    </div>
                </div>
            }
        </>
    );
};

export default Modal;