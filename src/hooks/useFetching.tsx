import debounce from "just-debounce-it";
import { useEffect, useState } from "react";

export function useFetching<T>(callback: (...args: any[]) => Promise<T[]>, fetchParams: any[] = [], arrayDependencies: any[] = [], timeout: number = 0) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [values, setValues] = useState<T[]>([]);

    const fetch = async () => {
        try {
            setIsLoading(true);
            const vals = await callback([...fetchParams]);
            setValues(vals);
            setError("");
        } catch (error) {
            console.error(error)
            setError(`${error}`);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const fetchDebounce = debounce(() => fetch(), timeout);
        fetchDebounce();
    }, [...arrayDependencies])

    return { isLoading, error, values }
}