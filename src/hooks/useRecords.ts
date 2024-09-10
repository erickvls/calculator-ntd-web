import { useRouter } from "next/navigation"
import { api } from "../services/api.service"
import { Operation } from "./useCalculator";


interface CalculatorResponse {
    id: string;
    userBalance: string;
    date: string;
    operationType: Operation;
    operationResponse: string;
}

interface ApiResponse {
    content: CalculatorResponse[];
    pageable: {
        pageNumber: number;
        pageSize: number;
        sort: {
            empty: boolean;
            unsorted: boolean;
            sorted: boolean;
        };
        offset: number;
        paged: boolean;
        unpaged: boolean;
    };
}

export const useRecords = () => {

    const getRecords = (): Promise<ApiResponse> => {
        return api('/records', 'GET');
    };

    return {
        getRecords,
    }
}