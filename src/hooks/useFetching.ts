import debounce from "just-debounce-it";
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';

export function useFetching<T>(
    callback: (...args: unknown[]) => Promise<T[]>,
    fetchParams: unknown[] = [],
    arrayDependencies: unknown[] = [],
    timeout: number = 0
) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [values, setValues] = useState<T[]>([]);

    const fetch = useDebouncedCallback(async () => {
        try {
            setIsLoading(true);
            const vals = await callback(...fetchParams);
            setValues(vals);
            setError("");
        } catch (error) {
            setError(`${error}`);
            setValues([]);
        } finally {
            setIsLoading(false);
        }
    }, timeout)

    useEffect(() => {
        fetch()
    }, [...arrayDependencies]);

    const updateValues = (newValues: T[]) => {
        setValues(newValues);
    };

    return { isLoading, error, values, updateValues };
}
