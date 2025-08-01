"use client"
import React, {
    ChangeEvent,
    createContext,
    FormEvent,
    useContext,
    useState
} from "react";
import { useRouter } from "next/navigation";
import type { AuthFormType } from "@/types/auth";
import { userService } from "@/services/user/service";
import { useUserAuthenticated } from "@/hooks/useUserAuthenticated";
import { BadRequestException } from "@/services/exceptions";

type AuthContextType = {
    formData: AuthFormType;
    onChangeForm: (e: ChangeEvent<HTMLInputElement>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuthForm = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthForm must be within AuthContext");
    }
    return context;
};

export const Root = ({
    children,
    btnText,
    auth,
    authByGoogle
}: {
    children: React.ReactNode;
    btnText: string;
    auth?: (form: AuthFormType) => Promise<void>;
    authByGoogle?: (form: AuthFormType) => Promise<void>;
}) => {
    const [formData, setFormData] = useState<AuthFormType>({
        nickname: "",
        password: "",
        email: ""
    });
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!auth || !validateForm()) return;
        try {
            await auth(formData);
            router.replace("/");
        } catch (error) {
            if (error instanceof BadRequestException) {
                setError(error.message)
            }
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await userService.signInByGoogle();
        } catch (error) {
            if (error instanceof BadRequestException) {
                setError(error.message)
            }
        }
    };

    const validateForm = () => {
        if (formData.nickname && formData.nickname.trim() === "") {
            setError("El nombre no puede estar vacío");
            return false;
        }

        if (
            formData.email === "" ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email ?? "")
        ) {
            setError("El email debe ser válido");
            return false;
        }

        if (formData.password.trim() === "") {
            setError("La contraseña no puede estar vacía");
            return false;
        }

        setError("");
        return true;
    };

    const onChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (error) {
            validateForm();
        }
    };

    return (
        <AuthContext.Provider value={{ formData, onChangeForm }}>
            <form
                onSubmit={onSubmit}
                className="flex flex-col items-center w-[90%] gap-4"
            >
                <div className="w-full flex flex-col items-center gap-4">
                    {children}
                </div>
                <div className="w-full">
                    {error && (
                        <p className="text-red-500 font-semibold w-full">
                            {error}
                        </p>
                    )}
                </div>
                <div className="w-full flex flex-col items-center gap-4">
                    <button
                        type="submit"
                        className="cursor-pointer bg-[#1A78E5] pt-2 pb-2 w-full rounded-[4px] p-1 text-white font-semibold"
                    >
                        {btnText}
                    </button>
                    {/* <p>O</p>
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="bg-[#dadada] cursor-pointer w-full rounded-[4px] p-1 pt-2 pb-2 font-semibold flex items-center justify-center"
                    >
                        <div className="flex w-full items-center justify-center gap-2 relative">
                            <p>Continuar con Google</p>
                            <img
                                className="w-[14px] h-[14px] mt-[-3px] absolute right-72"
                                src="/google-icon.svg"
                                alt="Google"
                            />
                        </div>
                    </button> */}
                </div>
            </form>
        </AuthContext.Provider>
    );
};

export const NicknameInput = () => {
    const { onChangeForm } = useAuthForm();
    return (
        <input
            type="text"
            className="pt-2 pb-2 pl-4 w-full rounded-[4px] bg-[#dadada]"
            placeholder="Nombre"
            name="nickname"
            onChange={onChangeForm}
        />
    );
};

export const PasswordInput = () => {
    const { onChangeForm } = useAuthForm();
    return (
        <input
            type="password"
            placeholder="Contraseña"
            className="pt-2 pb-2 pl-4 w-full rounded-[4px] bg-[#dadada]"
            name="password"
            onChange={onChangeForm}
        />
    );
};

export const EmailInput = () => {
    const { onChangeForm } = useAuthForm();
    return (
        <input
            type="text"
            name="email"
            placeholder="Email"
            className="pt-2 pb-2 pl-4 w-full rounded-[4px] bg-[#dadada]"
            onChange={onChangeForm}
        />
    );
};

const AuthForm = {
    Root,
    NicknameInput,
    PasswordInput,
    EmailInput
};

export default AuthForm;
