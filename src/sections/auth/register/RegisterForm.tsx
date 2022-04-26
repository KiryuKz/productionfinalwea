import * as yup from 'yup'
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------
import  Register  from './index'

type FormValuesProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone_number: string;
  confirmPassword: string;
  afterSubmit?: string;
};

type RegisterForm = ({
  toggle : () => void;
  userinfo: (user: FormValuesProps) => void;
})
export default function RegisterForm({toggle,userinfo}: RegisterForm) {
  const isMountedRef = useIsMountedRef();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [isAgent,setIsAgent] = useState(false);
  const [error,setNewError] = useState('');
  const RegisterSchema = yup.object().shape({
    firstName: yup.string().required(t('registerFields.firstName')),
    lastName: yup.string().required(t('registerFields.lastName')),
    email: yup.string().email().required(t('registerFields.email')),
    phone_number: yup.string().required(t('registerFields.phoneNumber')),
    password: yup.string().required(t('registerFields.password')).min(8, 'Password must be at least 8 characters long').max(20).matches(
        // /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        /[*@#]/,t('registerFields.specialChar')
      ).matches(/[0-9]/,t('registerFields.number')),
    confirmPassword: yup.string().oneOf([yup.ref("password")], t('registerFields.confirmPassword')).required(t('registerFields.password'))
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone_number: '',
    password: '',
    confirmPassword: ''
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;
  const handleChangeEmail = (e: React.SyntheticEvent<HTMLInputElement>) => {
    if(/@plotmy.com/.test((e.target as HTMLInputElement).value)){
      setIsAgent(true);
    }else{
      setIsAgent(false);
    }
  }
  const triggerError = (err: string) => {
    setNewError(err);
  }
  const onSubmit = async (data: FormValuesProps) => {
    Register(data, toggle,triggerError);
    const userData = {...data,isAgent}
    userinfo(userData);
    // try {
    //   await register(data.email, data.password, data.firstName, data.lastName);
    // } catch (error) {
    //   console.error(error);

    //   reset();

    //   if (isMountedRef.current) {
    //     setError('afterSubmit', { ...error, message: error.message });
    //   }
    // }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {error && <Alert severity="error">{error}</Alert>}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField onChangeCapture={handleChangeEmail} name="email" label="Email address" />
          <RHFTextField name="phone_number" label="Phone number" />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <RHFTextField
            name="confirmPassword"
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
