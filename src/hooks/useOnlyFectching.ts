import debounce from "just-debounce-it";
import { useEffect, useState } from "react";

export function useOnlyFetching<T>(callback: (...args: unknown[]) => Promise<T>, fetchParams: unknown[] = [], arrayDependencies: unknown[] = [], timeout: number = 0) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [value, setValue] = useState<T | null | undefined>(null);

    const fetch = async () => {
        try {
            setIsLoading(true);
            const vals = await callback(...fetchParams);
            setValue(vals);
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

    return { isLoading, error, value }
}