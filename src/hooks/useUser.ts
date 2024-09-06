import { useRouter } from "next/navigation"
import { api } from "../services/api.service"
import { USER_TOKEN_KEY } from "../utils/constants";


export const useUser = () => {

    const router = useRouter();

    const handleSuccessfulAuthentication = (response: Record<string, string>) => {
        if (response.token) {
            localStorage.setItem(USER_TOKEN_KEY, response.token);
            router.replace('home');
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
        localStorage.clear();
        router.replace('/');
    }

    return {
        register,
        login,
        logout,
    }
}