// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Link, Container, Typography,Card, Alert, Stack } from '@mui/material';
import { LoadingButton, StaticDateTimePicker } from "@mui/lab";
import { Auth } from 'aws-amplify'
// layouts
import Layout from '../../../layouts';
// components
// sections
import VerificationInput from "react-verification-input";
// import { Auth,API,graphqlOperation } from 'aws-amplify'

import { useSnackbar } from 'notistack';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useResponsive from '../../../hooks/useResponsive';
import useCountDown from 'react-countdown-hook';
import LanguagePopover from '../../../layouts/dashboard/header/LanguagePopover'
// import { User } from '../../../types/signup'
import { VerifyUser } from '.';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
}));
const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  backgroundColor: 'red',
  color: 'white',
  padding: theme.spacing(1),
  borderRadius: 8
}));
// ----------------------------------------------------------------------
VerifyCode.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="logoOnly">{page}</Layout>;
};
// ----------------------------------------------------------------------
type VerifyFormProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone_number: string;
  isAgent: boolean;
  confirmPassword: string;
}
type VerifyFormPropsFinal = {
  userdata: VerifyFormProps;
}

export default function VerifyCode({userdata}: VerifyFormPropsFinal) {
  const { t } = useTranslation();
  const [timeLeft, actions] = useCountDown(30000,1000);
  const [count,setCount] = useState(true);
  const [code,setCode] = useState('')
  const [enable,setEnable] = useState(false)
  const [error, setErrorCode] = useState('')
  const handleErrorChange = (err: string) => {
    setErrorCode(err);
  }
  const onSubmitHandler = async (code: string) => {
    setErrorCode('');
    const data = {...userdata,code}
    VerifyUser(data, handleErrorChange);
    // try{
    //   await Auth.confirmSignUp(email,code);
    //   enqueueSnackbar(t('validate.snackbar'), { variant: 'success', action: () => {} });
    //   isLogin ? Router.reload() : router.push('/login');
    // }catch(err){
    //   console.log(err)
    //   enqueueSnackbar(t('validate.errorSnackbar'), {variant: 'error', action: () => {}})
    // }
  }
  const onClickHandlerCounter = async() => {
    try { 
      await Auth.resendSignUp(userdata.email);
      setCount(false)
      actions.start()
    }catch(err){
      err;
    }
  }
  useEffect(() => {
    if(!timeLeft){
      setCount(true)
    }
  },[timeLeft])
  useEffect(() => {
    if (code.length === 6){
      setEnable(true);
    } else{
      setEnable(false)
    }
  },[code])
  useEffect(() => {
    
  },[error])
  return (
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          
            <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                {t('validate.title')}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                  {`${t('validate.subtitle.first')} `}
                  <span style={{textDecoration: 'underline', fontWeight: 'bold'}}>{}</span>
              </Typography>
              </Box>   
            </Box>
            {error && <Alert severity="error">{error}</Alert>}
            <Box sx={{ mt: 5, mb: 3}}>
            <Box px={8}>
              <VerificationInput 
              validChars='0-9'
              onChange={e => setCode(e)}/>
            </Box>
              <LoadingButton
                fullWidth
                sx = {{mb: 2, mt: 2}}
                size="large"
                variant="contained"
                disabled = {!enable}
                onClick={() => {
                  if(code.length === 6){
                    onSubmitHandler(code);
                }}}
                >
                {t('validate.button')}
            </LoadingButton>  
            </Box>
            <Typography variant="body2" align="center">
              {t('validate.resend.problem')} &nbsp;
              <Link 
                variant="subtitle2" 
                color = {count ? 'primary': 'text.secondary'}
                sx = {{cursor: 'pointer', textDecoration: !count ? 'none' : 'underline'}} 
                onClick={count ? onClickHandlerCounter: () => {}}>
                {`${t('validate.resend.link')} `}
                {!count && `(${(timeLeft/1000)})`}
              </Link>
            </Typography>
          </Box>
        </Container>
      </RootStyle>
  );
}