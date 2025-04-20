import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type Success<T> = {
    data: T;
    error: null;
};

type Failure<E> = {
    data: null;
    error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

export async function tryCatch<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>> {
    try {
        const data = await promise;
        return { data, error: null };
    } catch (error) {
        return { data: null, error: error as E };
    }
}

type Diff<T extends object, U extends object> = {
    [K in keyof T | keyof U as K extends keyof T
        ? K extends keyof U
            ? T[K] extends U[K]
                ? U[K] extends T[K]
                    ? never // same in both
                    : K
                : K
            : K // missing in U
        : K]: K extends keyof U ? U[K] : undefined; // added in U
};

export const getChangedProps = <T extends object, U extends object>(
    prev: T,
    next: U
): Diff<T, U> => {
    const result: Partial<Record<string, unknown>> = {};

    const allKeys = new Set([...Object.keys(prev), ...Object.keys(next)]);

    for (const key of allKeys) {
        const prevVal = prev[key as keyof T];
        const nextVal = next[key as keyof U];

        if ((prevVal as unknown) !== (nextVal as unknown)) {
            result[key] = nextVal;
        }
    }

    return result as Diff<T, U>;
};
