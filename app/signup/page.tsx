'use client'

import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUser } from '@/src/hooks/useUser';
import { Button, FormControl, FormHelperText, Input, InputLabel, TextField } from '@mui/material';

type Inputs = {
  email: string
  password: string
}

export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const { register: registerUser } = useUser();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    const result = await registerUser(email, password)

    console.log(result)
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth>
        <TextField
          required
          fullWidth
          id="username"
          label="Username or Email"
          {...register('email')}
        />
      </FormControl>



      <FormControl fullWidth>
        <TextField
          required
          fullWidth
          label="Password"
          type="password"
          id="password"
          {...register('password')}
        />
      </FormControl>

      <Button
        type="submit"
      >
        Regiser now
      </Button>
    </form>
  );
}