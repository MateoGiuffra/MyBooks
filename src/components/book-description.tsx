import React from "react";

interface IBookDescriptionProps {
    html: string
}

const BookDescription: React.FC<IBookDescriptionProps> = ({ html }) => {
    return (
        <div
            className="prose w-full"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};

export default BookDescription;