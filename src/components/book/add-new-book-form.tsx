"use client"
import React, { FormEvent, useCallback, useState } from 'react'
import BookCalendar from '../ui/my-calendar';
import { useCalendar } from '@/hooks/useCalendar';
import Modal from '../ui/modal';
import BookButton from '../ui/book-button';
import { Review, BookFirestore } from '@/types/book';
import { useUserAuthenticated } from '@/hooks/useUserAuthenticated';
import { userService } from '@/services/user/service';

const AddNewBookForm = ({ closeForm, reloadSearch }: { closeForm: () => void, reloadSearch: () => void }) => {
    const { date, setDate } = useCalendar();
    const [score, setScore] = useState(2.5);
    const [error, setError] = useState<string>("");
    const [showCalendar, setShowCalendar] = useState(false);
    const { id } = useUserAuthenticated();

    const handleScoreChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setScore(Number(e.target.value));
    }, []);

    const isAValidateForm = ({ title, authors, description, url, review }: { title: string, authors: string, description: string, url: string, review: string }) => {
        const params = [title, authors, description, url, review];
        if (params.some((p) => p.length === 0 || p.trim() === "")) {
            setError("No pueden haber campos vacíos")
            return false;
        }
        if (description.split(" ").length < 10) {
            setError("La descripción tiene que tener más de 10 palabras");
            return false;
        }
        setError("")
        return true;
    }

    const addNewBook = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            const form = e.currentTarget;
            const formData = new FormData(form);

            const title = formData.get("title");
            const authors = formData.get("authors");
            const description = formData.get("description");
            const url = formData.get("url");
            const review = formData.get("review");


            if (!isAValidateForm({
                title: title?.toString() ?? "",
                authors: authors?.toString() ?? "",
                description: description?.toString() ?? "",
                url: url?.toString() ?? "",
                review: review?.toString() ?? "",
            })) return;

            const newBook = {
                volumeInfo: {
                    title,
                    authors,
                    description,
                    imageLinks: {
                        smallThumbnail: url,
                        thumbnail: url
                    }
                },
                review: {
                    content: review,
                    hasReview: false,
                    score: score,
                    publishedRelease: date
                } as unknown as Review
            } as unknown as BookFirestore

            await userService.addNewBookByUser(newBook, id);
            closeForm();
            reloadSearch();
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div className='w-[361px]'>
            <form onSubmit={addNewBook} className='flex flex-col w-full  gap-4'>
                <fieldset className='flex flex-col w-full gap-4 '>
                    <legend className='font-bold text-[18px] mb-3'>Información del libro</legend>
                    {error && <p className='font-bold text-red-500'>{error}</p>}
                    <input type="text" className='pt-2 pb-2 pl-4 w-full rounded-[4px] bg-[#dadada]' placeholder='Título' name='title' />
                    <input type="text" className='pt-2 pb-2 pl-4 w-full rounded-[4px] bg-[#dadada]' placeholder='Autor/es' name='authors' />
                    <textarea className='resize-none pt-2 pb-2 pl-4 w-full rounded-[4px] bg-[#dadada]' placeholder='Descripción' name='description' />
                    <input type="text" className='pt-2 pb-2 pl-4 w-full rounded-[4px] bg-[#dadada]' placeholder='Portada (link)' name='url' />
                </fieldset>

                <fieldset className='flex flex-col w-full gap-4'>
                    <legend className='font-bold text-[18px] mb-3'>Review</legend>
                    <textarea className='resize-none pt-2 pb-2 pl-4 w-full rounded-[4px] bg-[#dadada]' placeholder='Tu Review' name='review' />
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
                    <label onClick={() => setShowCalendar(true)} className="w-full flex gap-2 cursor-pointer">
                        <p className="underline">Seleccionar fecha</p>
                        <span className="text-theme-lighter">({date?.toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })})</span>
                    </label>
                    <Modal
                        show={showCalendar}
                        closeModal={() => setShowCalendar(false)}
                    >
                        <BookCalendar date={date} setDate={setDate} bgColor="white" />
                    </Modal>
                </fieldset>
                <BookButton type='submit' bgColor='blue' fontColor='white'>
                    Añadir Libro
                </BookButton>
                <BookButton onHandleClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation()
                    closeForm()
                }}>
                    Cancelar
                </BookButton>
            </form>
        </div >
    )
}

export default AddNewBookForm