import { useRouter } from "next/navigation"
import { api } from "../services/api.service"
import { USER_TOKEN_KEY } from "../utils/constants";


const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const deleteCookie = (name: string) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};


export const useUser = () => {

    const router = useRouter();

    const handleSuccessfulAuthentication = (response: Record<string, string>) => {
        if (response.token) {
            setCookie(USER_TOKEN_KEY, response.token, 1);
            router.replace('/home');
        }
    }

    const register = (email: string, password: string) => {
        return api('/auth/register', 'POST', {
            username: email,
            password
        }).then(handleSuccessfulAuthentication)
    }

    const login = (email: string, password: string) => {
        return api('/auth/login', 'POST', {
            username: email,
            password
        }).then(handleSuccessfulAuthentication)
    }

    const logout = () => {
        deleteCookie(USER_TOKEN_KEY);
        router.replace('/');
    }

    return {
        register,
        login,
        logout,
    }
}