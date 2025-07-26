"use client"
import React, { FormEvent, useCallback, useState } from 'react'
import BookCalendar from '../ui/my-calendar';
import { useCalendar } from '@/hooks/useCalendar';
import Modal from '../ui/modal';
import BookButton from '../ui/book-button';
const AddNewBookForm = ({ closeForm }: { closeForm: () => void }) => {
    const { date, setDate } = useCalendar();
    const [score, setScore] = useState(2.5);
    const [showCalendar, setShowCalendar] = useState(false);

    const handleScoreChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setScore(Number(e.target.value));
    }, []);

    const addNewBook = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const title = formData.get("title");
        const authors = formData.get("authors");
        const description = formData.get("description");
        const url = formData.get("url");
        const review = formData.get("review");

        const newBook = {
            volumeInfo: {
                title,
                authors,
                description,       
            }
        }
    }

    return (
        <div>
            <form onSubmit={addNewBook} className='flex flex-col w-full  gap-4'>
                <fieldset className='flex flex-col w-full gap-4 '>
                    <legend className='font-bold text-[18px] mb-3'>Información del libro</legend>
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
                        style={{ ['--val' as any]: score } as React.CSSProperties}
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
                <BookButton onHandleClick={(e) => {
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