"use client"
import React, { useState } from 'react'
import AddNewBookForm from '../book/add-new-book-form'
import Modal from '../ui/modal'

const AddBookIcon = () => {
    const [show, setShow] = useState<boolean>(false);
    return (
        <>
            <div className='h-full cursor-pointer' onClick={() => setShow(true)}>
                <p className="absolute right-0 text-4xl h-full flex items-center pr-4">+</p>
            </div>
            <Modal
                show={show}
                closeModal={() => setShow(false)}
            >
                < AddNewBookForm closeForm={() => setShow(false)} />
            </Modal>
        </>
    )
}

export default AddBookIcon