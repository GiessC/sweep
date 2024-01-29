export const getItem = (key: string): string | null => {
    return localStorage.getItem(key);
};

export const setItem = (key: string, value: unknown) => {
    return localStorage.setItem(key, String(value));
};

export const removeItem = (key: string) => {
    return localStorage.removeItem(key);
};
