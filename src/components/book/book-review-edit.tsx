"use client"
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import BookButton from "../ui/book-button";
import { Book, BookFirestore, Review } from "@/types/book";
import { userService } from "@/services/users";
import { useUserAuthenticated } from "@/hooks/useUserAuthenticated";
import { useCalendar } from "@/hooks/useCalendar";
import BookCalendar from "@/components/ui/my-calendar";

interface IReviewSectionProps {
    book: Book | BookFirestore;
    finishEditMode?: () => void;
}

const ReviewEditSection: React.FC<IReviewSectionProps> = ({ book, finishEditMode }) => {
    const [reviewState, setReviews] = useState<Review>({
        hasReview: false,
        content: "",
        score: 2.5
    } as Review)
    const { date, setDate } = useCalendar();
    const { userState } = useUserAuthenticated(false)

    const updateReview = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const { value, name } = e.target;
        const valueFormated = "score" === name ? Number(value) : value
        setReviews({
            ...reviewState,
            [name]: valueFormated
        })
    }


    useEffect(() => {
        if (book.review && book.review.hasReview) {
            setReviews(book.review);
        }
    }, [])

    const onSend = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            if (!userState) {
                alert("Debes estar logeado primero!")
                return;
            }
            setReviews({
                ...reviewState,
                hasReview: true
            })
            const bookUpdated = {
                ...book,
                review: reviewState
            }
            await userService.addBookReadByUser(bookUpdated, userState);
            finishEditMode && finishEditMode();
            alert("Review Actualizada")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="w-full flex flex-col items-center">
            <form action="" className="w-full flex flex-col  gap-4" onSubmit={(e) => onSend(e)}>
                <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.5"
                    name="score"
                    value={reviewState.score}
                    className="star-rating"
                    style={{ ['--val' as any]: reviewState.score } as React.CSSProperties}
                    onChange={e => updateReview(e)}
                />
                <textarea
                    className="w-full bg-white rounded-[4px] p-2 pt-1 pb-10 overflow-auto"
                    placeholder="Escribe tu review aqui"
                    name="content"
                    onChange={e => updateReview(e)}
                />
                <div className="w-full flex flex-col items-center gap-4">
                    <label className="w-full flex gap-2 cursor-pointer">
                        <p>Fecha de lectura</p>
                        <span className="text-theme-lighter ">( por defecto hoy )
                        </span>
                    </label>
                    <BookCalendar date={date} setDate={setDate} bgColor="white" />
                </div>
                <BookButton bgColor="blue" fontColor="white" type="submit">Actualizar</BookButton>
                <BookButton onHandleClick={finishEditMode}>Cancelar</BookButton>
            </form>
        </div >
    );
};

export default ReviewEditSection;