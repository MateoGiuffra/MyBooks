import React from 'react'
import { booksService } from '@/services/books';
import ReviewSection from '@/components/review-section';
import BookDescription from '@/components/book-description';
interface IBookPageProps {
    params: Promise<{ id: string }>
}

const BookPage: React.FC<IBookPageProps> = async ({ params }) => {
    const { id } = await params;
    const book = await booksService.getBookById(id);

    if (!book) return null;
    const {
        volumeInfo: {
            title,
            authors,
            publisher,
            publishedDate,
            description,
            pageCount,
            categories,
            imageLinks,
            language,
            previewLink,
            infoLink
        },
        saleInfo: {
            saleability,
            listPrice,
            buyLink
        }
    } = book;

    return (
        <div className="w-full overflow-scroll">
            <img
                className="w-full h-[218px] object-cover"
                src={imageLinks.smallThumbnail}
                alt={title}
            />
            <div className='w-full p-4 flex flex-col items-center h-full gap-4'>
                <div className='w-full flex flex-col items-center h-full'>
                    <h2 className='text-[22px] font-bold w-full'>{title}</h2>
                    <p className='w-full text-theme-lighter'>by {authors}</p>
                </div>
                <BookDescription html={description} />
                <div>
                    <ReviewSection />
                </div>
            </div>
        </div>
    );
};

export default BookPage;
