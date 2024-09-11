import { api } from "../services/api.service"

export enum Operation {
    ADDITION = 'ADDITION',
    SUBTRACTION = 'SUBTRACTION',
    MULTIPLICATION = 'MULTIPLICATION',
    DIVISION = 'DIVISION',
    SQUARE_ROOT = 'SQUARE_ROOT',
    RANDOM_STRING = 'RANDOM_STRING'
};

interface CalculatorResponse {
    amount: string;
    date: string;
    id: string;
    operationResponse: string;
    operationType: Operation;
    userBalance: string;
}

export const useCalculator = () => {
    const calculate = (operand1: number, operand2: number, operationType: Operation): Promise<CalculatorResponse> => {
        return api('/calculator', 'POST', {
            operand1,
            operand2,
            operationType,
        })
    }

    const generateString = (): Promise<CalculatorResponse> => {
        return api('/calculator/generate/', 'GET');
    };

    return {
        calculate,
        generateString
    }
}