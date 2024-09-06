import { USER_TOKEN_KEY } from "../utils/constants";

export const api = async (path: string, method: 'POST' | 'GET', body: object = {}) => {
    const headers: Record<string, string | null> = {}

    if (localStorage.getItem(USER_TOKEN_KEY)) {
        headers['Authorization'] = localStorage.getItem(USER_TOKEN_KEY);
    }
    console.log(process.env.NEXT_PUBLIC_API_URL);
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
        headers: {
            'Content-type': 'application/json',
            ...headers
        },
        method,
        body: JSON.stringify(body)
    });

    if (result.ok) {
        return result.json();
    } else {
        const error = await result.json()
        console.error(error)
        throw Error(error)
    }
}