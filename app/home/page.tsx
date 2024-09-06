'use client';

import withAuth from "@/src/hoc/withAuth";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type Operation = 'add' | 'subtract' | 'multiply' | 'divide';

type Inputs = {
  number1: number;
  number2: number;
  operation: Operation;
};

function Page() {
  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      number1: 0,
      number2: 0,
      operation: 'add'
    }
  });
  const [result, setResult] = useState<number | null>(null);

  const onSubmit = ({ number1, number2, operation }: Inputs) => {
    let computedResult;
    switch (operation) {
      case 'add':
        computedResult = number1 + number2;
        break;
      case 'subtract':
        computedResult = number1 - number2;
        break;
      case 'multiply':
        computedResult = number1 * number2;
        break;
      case 'divide':
        computedResult = number2 !== 0 ? number1 / number2 : null;
        break;
    }
    setResult(computedResult);
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
                <MenuItem value="add">Add</MenuItem>
                <MenuItem value="subtract">Subtract</MenuItem>
                <MenuItem value="multiply">Multiply</MenuItem>
                <MenuItem value="divide">Divide</MenuItem>
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