import { USER_TOKEN_KEY } from "../utils/constants";

const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
};

export const api = async (path: string, method: 'POST' | 'GET', body: object = {}) => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };


    const token = getCookie(USER_TOKEN_KEY);
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
            headers,
            method,
            body: method !== 'GET' ? JSON.stringify(body) : null, // GET doesn't include body
        });

        if (!result.ok) {
            const error = await result.json(); //  It reads the error body
            const firstErrorMessage = error?.errors?.field?.[0]?.message || 'Something went wrong'; // Get the first message from error array field
            throw new Error(firstErrorMessage); // throw the error with the message
        }

        return result.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error; // Any other api issue
    }
}