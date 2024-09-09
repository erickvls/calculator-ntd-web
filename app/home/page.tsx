'use client';

import { Operation, useCalculator } from "@/src/hooks/useCalculator";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from 'react-toastify';

type Inputs = {
  number1: number;
  number2: number;
  operation: Operation;
};


function Page() {
  const [result, setResult] = useState<string | null>(null);

  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      number1: 0,
      number2: 0,
      operation: Operation.ADDITION
    }
  });

  const { calculate } = useCalculator();


  const onSubmit = async ({ number1, number2, operation }: Inputs) => {
    try {
      const { operationResponse } = await calculate(number1, number2, operation);

      setResult(operationResponse);
    } catch (error) {
      console.log(error);
      toast.error(error?.message ?? 'calcula direito arrombado fdp')
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
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
              />
            )}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Operation</InputLabel>
          <Controller
            name="operation"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Operation">
                <MenuItem value={Operation.ADDITION}>Addition</MenuItem>
                <MenuItem value={Operation.SUBTRACTION}>Subtraction</MenuItem>
                <MenuItem value={Operation.MULTIPLICATION}>Multiplication</MenuItem>
                <MenuItem value={Operation.DIVISION}>Division</MenuItem>
                <MenuItem value={Operation.SQUARE_ROOT}>Square Root</MenuItem>
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
          Calculate
        </Button>

        {result !== null && (
          <Typography variant="h6" sx={{ mt: 2 }}>
            Result: {result}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default Page