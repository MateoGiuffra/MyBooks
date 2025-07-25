"use client"
import React, { useState } from "react";
import { truncate } from "fs";
interface IBookDescriptionProps {
    html: string
}

const BookDescription: React.FC<IBookDescriptionProps> = ({ html }) => {
    const [sliceSize, setSliceSize] = useState<number>(500);
    let finalHtml = html.slice(0, sliceSize) + "</p>";
    const showMore = finalHtml.length < html.length;

    return (
        <div className="w-full">
            <div
                className="prose w-full"
                dangerouslySetInnerHTML={{ __html: finalHtml }}
            />
            {showMore && (
                <span
                    className="text-blue-600 font-bold cursor-pointer w-full flex items-center justify-center "
                    onClick={() => setSliceSize((prev) => prev + 300)}
                >
                    Mostrar más
                </span>
            )}
        </div>

    );
};

export default BookDescription;