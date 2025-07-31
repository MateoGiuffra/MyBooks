import debounce from "just-debounce-it";
import { useEffect, useRef, useState } from "react";

export function useFetching<T>(
    callback: (...args: unknown[]) => Promise<T[]>,
    fetchParams: unknown[] = [],
    arrayDependencies: unknown[] = [],
    timeout: number = 0
) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [values, setValues] = useState<T[]>([]);

    const fetch = async () => {
        try {
            setIsLoading(true);
            const vals = await callback(...fetchParams);
            setValues(vals);
            setError("");
        } catch (error) {
            setError(`${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    const debouncedFetchRef = useRef<() => void>(null);

    useEffect(() => {
        debouncedFetchRef.current = debounce(fetch, timeout);
    }, [callback, timeout]);

    useEffect(() => {
        debouncedFetchRef.current?.();
    }, [...arrayDependencies]);

    const updateValues = (newValues: T[]) => {
        setValues(newValues);
    };

    return { isLoading, error, values, updateValues };
}
