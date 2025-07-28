"use client"
import React, {
    ChangeEvent,
    FormEvent,
    useEffect,
    useState,
    useCallback
} from "react";
import BookButton from "../ui/book-button";
import { Book, BookFirestore, Review } from "@/types/book";
import { userService } from "@/services/user/service";
import { useUserAuthenticated } from "@/hooks/useUserAuthenticated";
import { useCalendar } from "@/hooks/useCalendar";
import BookCalendar from "@/components/ui/my-calendar";
import ReviewSkeleton from "../skeletons/review-skeleton";
import { Timestamp } from "firebase/firestore";

interface IReviewSectionProps {
    book: Book | BookFirestore;
    finishEditMode: () => void;
}

const ReviewEditSection: React.FC<IReviewSectionProps> = ({ book, finishEditMode }) => {
    const { userState } = useUserAuthenticated(false);
    const { date, setDate } = useCalendar();

    const [content, setContent] = useState("");
    const [score, setScore] = useState(2.5);
    const [publishedRead, setPublishedRead] = useState<Timestamp | Date>(new Date());
    const [showCalendar, setShowCalendar] = useState(false);

    const transformToDate = () => {
        try {
            return book.review?.publishedRead instanceof Date
                ? publishedRead
                : (publishedRead as Timestamp).toDate()
        } catch (error) {
            return book.review?.publishedRead
        }
    }

    useEffect(() => {
        if (book.review?.hasReview) {
            setContent(book.review.content);
            setScore(book.review.score);
            setPublishedRead(transformToDate());
        }
    }, []);

    useEffect(() => {
        if (date) {
            setPublishedRead(date);
        }
    }, [date, book]);

    const handleScoreChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setScore(Number(e.target.value));
    }, []);

    const handleContentChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }, []);

    const onSend = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userState) {
            alert("Debes estar logeado primero!");
            return;
        }

        const newReview: Review = {
            hasReview: book.review?.hasReview,
            content,
            score,
            publishedRead
        };

        try {
            const bookUpdated = {
                ...book,
                review: newReview
            };

            await userService.addUserReadBook(bookUpdated, userState);
            finishEditMode?.();
            alert("Review Actualizada");
        } catch (error) {
            console.error(error);
        }
    };

    if (!book) {
        return <ReviewSkeleton />;
    }


    return (
        <div className="w-full flex flex-col items-center">
            <form className="w-full flex flex-col gap-4" onSubmit={onSend}>
                <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.5"
                    name="score"
                    value={score}
                    className="star-rating"
                    style={{ ['--val']: score } as React.CSSProperties}
                    onChange={handleScoreChange}
                />
                <textarea
                    className="w-full bg-white rounded-[4px] p-2 pt-1 pb-10 overflow-auto"
                    placeholder="Escribe tu review aqui"
                    name="content"
                    value={content}
                    onChange={handleContentChange}
                />
                <div className="w-full flex flex-col items-center gap-4">
                    <label onClick={() => setShowCalendar(true)} className="w-full flex gap-2 cursor-pointer">
                        <p className="underline">Seleccionar fecha</p>
                        <span className="text-theme-lighter">({
                            (publishedRead instanceof Date
                                ? publishedRead
                                : (publishedRead as Timestamp).toDate()
                            ).toLocaleDateString("es-ES", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })
                        })</span>
                    </label>
                    {showCalendar && (
                        <div
                            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30"
                            onClick={() => setShowCalendar(false)}
                        >
                            <div
                                className="bg-white p-6 rounded-xl shadow-lg z-[10000]"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <BookCalendar date={date} setDate={setDate} bgColor="white" />
                            </div>
                        </div>
                    )}
                </div>
                <BookButton bgColor="blue" fontColor="white" type="submit">
                    Actualizar
                </BookButton>
            </form>
            <div className="w-full pt-4">
                <BookButton onHandleClick={finishEditMode}>Cancelar</BookButton>
            </div>
        </div>
    );
};

export default ReviewEditSection;
