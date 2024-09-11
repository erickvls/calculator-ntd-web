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
    },
    totalElements: number,
    totalPages: number,
    size: number
}

export const useRecords = () => {

    const getRecords = (page: number = 0, size: number = 10, sort: string = 'date,desc'): Promise<ApiResponse> => {
        return api(`/records?page=${page}&size=${size}&sort=${sort}`, 'GET');
    };

    const deleteRecord = (id: string): Promise<void> => {
        return api(`/records/${id}`, 'DELETE');
    };

    return {
        getRecords,
        deleteRecord
    }
}