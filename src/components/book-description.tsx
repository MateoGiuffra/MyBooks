"use client"
import React, { useState } from "react";
interface IBookDescriptionProps {
    html: string
}

const BookDescription: React.FC<IBookDescriptionProps> = ({ html }) => {
    const [sliceSize, setSliceSize] = useState<number>(500);
    const finalHtml = html.slice(0, sliceSize);
    const showMore = finalHtml.length < html.length;

    return (
        <div>
            <div
                className="prose w-full"
                dangerouslySetInnerHTML={{ __html: finalHtml }}
            />
            <div className="text-blue-600 font-bold" onClick={() => setSliceSize((prev) => prev + 300)}>{showMore && <p>ver mas...</p>}</div>
        </div>
    );
};

export default BookDescription;