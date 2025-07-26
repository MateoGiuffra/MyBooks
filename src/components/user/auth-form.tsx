"use client"
import React, { ChangeEvent, createContext, FormEvent, useContext, useState } from 'react'
import { useRouter } from 'next/navigation';
import type { AuthFormType } from '@/types/auth';

type AuthContextType = {
    formData: AuthFormType;
    onChangeForm: (e: ChangeEvent<HTMLInputElement>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuthForm = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuthForm must be within AuthContext")
    }
    return context;
}

export const Root = ({ children, btnText, auth, authByGoogle }: { children: React.ReactNode, btnText: string, auth?: (form: AuthFormType) => Promise<void>, authByGoogle?: (form: AuthFormType) => Promise<void> }) => {
    const [formData, setFormData] = useState<AuthFormType>({
        nickname: "",
        password: "",
        email: "",
    } as AuthFormType);
    const [error, setError] = useState<string>("");
    const [byGoogle, setByGoogle] = useState<boolean>(false);
    const router = useRouter();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (authByGoogle && byGoogle) {
            await authAction(authByGoogle);
            return;
        }
        if (auth) {
            await authAction(auth);
        }
    }

    const authAction = async (callback: (form: AuthFormType) => Promise<void>) => {
        try {
            if (!byGoogle && !validateForm()) return;
            auth && await callback(formData);
            router.replace("/")
        } catch (error) {
            console.error(error)
        }
    }

    const validateForm = () => {
        if (formData.nickname && formData.nickname.trim() == "") {
            setError("El nombre no puede estar vacio")
            return false;
        }

        if (formData.email && (formData.email == "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))) {
            setError("El email debe de ser válido!")
            return false;
        }
        if (formData.password.trim() == "") {
            setError("La contraseña no puede estar vacia")
            return false;
        }

        setError("");
        return true;
    }

    const onChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
        if (error) {
            validateForm();
        }
    }

    return (
        <AuthContext.Provider value={{ formData, onChangeForm }}>
            <form onSubmit={(e) => onSubmit(e)} className='flex flex-col items-center w-[90%] gap-4'>
                <div className='w-full flex flex-col items-center gap-4'>
                    {children}
                </div>
                <div className='w-full'>
                    {error && <p className='text-red-500 font-semibold w-full'>{error}</p>}
                </div>
                <div className='w-full flex flex-col items-center gap-4'>
                    <button type='submit' className='cursor-pointer  bg-[#1A78E5] pt-2 pb-2 w-full rounded-[4px] p-1 text-white font-semibold' onClick={() => setByGoogle(false)}>
                        {btnText}
                    </button>
                    <p>O</p>
                    <button className='bg-[#dadada] cursor-pointer w-full rounded-[4px] p-1 pt-2 pb-2 font-semibold flex items-center justify-center' onClick={() => setByGoogle(true)}>
                        <div className='flex w-full items-center justify-center gap-2 relative'>
                            <p>Continuar con Google</p>
                            <img className='w-[14px] h-[14px] mt-[-3px] absolute right-72' src="/google-icon.svg" alt="Google" />
                        </div>
                    </button>
                </div>
            </form>
        </AuthContext.Provider>

    )
}

export const NicknameInput = ({ children }: { children?: React.ReactNode }) => {
    const { onChangeForm } = useAuthForm();
    return (
        <input type="text" className='pt-2 pb-2 pl-4 w-full rounded-[4px] bg-[#dadada]' placeholder='Nombre' name='nickname' onChange={(e) => onChangeForm(e)} />
    )
}

export const PasswordInput = () => {
    const { onChangeForm } = useAuthForm();
    return (
        <input type="password" placeholder='Contraseña' className='pt-2 pb-2 pl-4 w-full rounded-[4px] bg-[#dadada]' name='password' onChange={(e) => onChangeForm(e)} />
    )
}

export const EmailInput = () => {
    const { onChangeForm } = useAuthForm();
    return (
        <input type="text" name='email' placeholder='Email' className='pt-2 pb-2 pl-4 w-full rounded-[4px] bg-[#dadada]' onChange={(e) => onChangeForm(e)} />
    )
}

const AuthForm = {
    Root,
    NicknameInput,
    PasswordInput,
    EmailInput
}

export default AuthForm;