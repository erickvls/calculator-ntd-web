import { api } from "../services/api.service"

interface AccountInfo {
    email: string;
    balance: string
}

export const useCredits = () => {

    const getCredits = (): Promise<AccountInfo> => {
        return api('/account', 'GET');
    };

    return {
        getCredits,
    }
}