import { useState, useCallback,useEffect } from 'react';

import { Box, Container } from '@mui/material';
import Link  from '@mui/material/Link';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';
import InputAdornment from '@mui/material/InputAdornment';
import {  data, useLocation, useNavigate } from 'react-router-dom';
import  { object, string } from 'zod';
import type {TypeOf}  from 'zod';
import  { FormProvider,  useForm } from 'react-hook-form';
import  type {SubmitHandler} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import { useRouter } from '../../routes/hooks';

import { Iconify } from '../../components/iconify';
import { useLoginMutation } from '../../redux/services/userApi';

// ----------------------------------------------------------------------
const loginSchema = object({
  email: string()
    .min(1, 'Email address is required')
    .email('Email Address is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export type LoginInput = TypeOf<typeof loginSchema>;



export function SignInView() {
    const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

console.log(loginSchema);
  const [loginUser, { isLoading, isError, error, isSuccess }] =
    useLoginMutation();
  
     const navigate = useNavigate();
  const location = useLocation();
   const from = ((location.state as any)?.from.pathname as string) || '/';
     const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  // console.log(methods);

  const [showPassword, setShowPassword] = useState(false);


useEffect(() => {
    console.log(data);
  if (isSuccess) {
    toast.success('You successfully logged in');
    console.log('It was successful');
    navigate(from);
  }

  if (isError) {
    const err = error as any;
    
    if (Array.isArray(err?.data?.error)) {
      err.data.error.forEach((el: any) =>
        toast.error(el.message, { position: 'top-right' })
      );
    } else {
      toast.error(err?.data?.message || 'Login failed', {
        position: 'top-right',
      });
    }
  }
}, [isSuccess, isError, error, navigate, from]);


  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    console.log(values)
    // 👇 Executing the loginUser Mutation
    loginUser(values);
  };
  const renderForm = (
     <FormProvider {...methods}>
    <Box
    component='form'
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
      <TextField
        fullWidth
        name="email"
        label="Email address"
        defaultValue="hello@gmail.com"
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />

      <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
        Forgot password?
      </Link>

      <TextField
        fullWidth
        name="password"
        label="Password"
        defaultValue="@demo1234"
        type={showPassword ? 'text' : 'password'}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 3 }}
      />

      <Button
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        
        loading={isLoading}
      >
        Sign in
      </Button>

      <LoadingButton
              variant='contained'
              sx={{ mt: 1 }}
              fullWidth
              disableElevation
              type='submit'
              loading={isLoading}
            >
              Login
            </LoadingButton>
    </Box>
    </FormProvider>
  );

  return (
    <>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h5">Sign in</Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          Don’t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }}>
            Get started
          </Link>
        </Typography>
      </Box>
      {renderForm}
      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          OR
        </Typography>
      </Divider>
      <Box
        sx={{
          gap: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:google" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:github" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:twitter" />
        </IconButton>
      </Box>
    </>
  );
}
