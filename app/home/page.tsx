'use client';

import AuthenticatedLayout from "@/src/components/AuthenticatedLayout";
import { useUserContext } from "@/src/context/UserContext";
import { Operation, useCalculator } from "@/src/hooks/useCalculator";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from 'react-toastify';

type Inputs = {
  number1: number;
  number2: number;
  operation: Operation;
};

export default function Home() {
  const [result, setResult] = useState<string | null>(null);
  const [isNumber2Disabled, setIsNumber2Disabled] = useState<boolean>(false);
  const [showNumberFields, setShowNumberFields] = useState<boolean>(true);
  const [buttonText, setButtonText] = useState<string>('Calculate');

  const { control, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {
      number1: 0,
      number2: 0,
      operation: Operation.ADDITION
    }
  });

  const { calculate, generateString } = useCalculator();
  const { setBalance } = useUserContext();
  const onSubmit = async ({ number1, number2, operation }: Inputs) => {
    try {
      if (operation === Operation.RANDOM_STRING) {
        const { operationResponse, userBalance } = await generateString();
        setResult(operationResponse);
        setBalance(userBalance);
      } else {
        const { operationResponse, userBalance } = await calculate(number1, number2, operation);
        setResult(operationResponse);
        setBalance(userBalance);
      }

    } catch (error) {
      let errorMessage = 'Something went wrong';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    }
  };

  const handleOperationChange = (event: SelectChangeEvent<Operation>) => {
    const selectedOperation = event.target.value as Operation;
    setIsNumber2Disabled(selectedOperation === Operation.SQUARE_ROOT);
    setShowNumberFields(selectedOperation !== Operation.RANDOM_STRING);
    setButtonText(selectedOperation === Operation.RANDOM_STRING ? 'Generate' : 'Calculate');

    reset({
      number1: 0,
      number2: 0,
      operation: selectedOperation
    });

    setResult(null);
  };

  return (
    <AuthenticatedLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Calculator
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{
          backgroundColor: '#fff',
          padding: 4,
          borderRadius: 2,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: 400,
        }}>
          {showNumberFields && (
            <FormControl fullWidth margin="normal">
              <Controller
                name="number1"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Number 1"
                    type="number"
                    fullWidth
                    required
                  />
                )}
              />
            </FormControl>
          )}

          {showNumberFields && (
            <FormControl fullWidth margin="normal">
              <Controller
                name="number2"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Number 2"
                    type="number"
                    fullWidth
                    required
                    disabled={isNumber2Disabled}
                  />
                )}
              />
            </FormControl>
          )}

          <FormControl fullWidth margin="normal">
            <InputLabel>Operation</InputLabel>
            <Controller
              name="operation"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Operation" onChange={(event) => {
                  field.onChange(event);
                  handleOperationChange(event as SelectChangeEvent<Operation>);
                }}>
                  <MenuItem value={Operation.ADDITION}>Addition</MenuItem>
                  <MenuItem value={Operation.SUBTRACTION}>Subtraction</MenuItem>
                  <MenuItem value={Operation.MULTIPLICATION}>Multiplication</MenuItem>
                  <MenuItem value={Operation.DIVISION}>Division</MenuItem>
                  <MenuItem value={Operation.SQUARE_ROOT}>Square Root</MenuItem>
                  <MenuItem value={Operation.RANDOM_STRING}>Generate String</MenuItem>
                </Select>
              )}
            />
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            {buttonText}
          </Button>

          {result !== null && (
            <Typography variant="h6" sx={{ mt: 2 }}>
              Result: {result}
            </Typography>
          )}
        </Box>
      </Box>
    </AuthenticatedLayout>
  );
}
