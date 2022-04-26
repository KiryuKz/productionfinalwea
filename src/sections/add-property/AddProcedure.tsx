// @mui
import { styled } from '@mui/material/styles';
import {  Box, Card, Typography, CardContent } from '@mui/material';
// @types
// components
import { useTranslation } from 'react-i18next';
import Image from '../../components/Image';
// import LightboxModal from '../../../../components/LightboxModal';
//animation
import { MotionContainer, varFade } from '../../components/animate';
import { m } from 'framer-motion';
import { Block } from '../../sections/overview/Block';
import { AddPropertyProps } from '.';
// ----------------------------------------------------------------------

const CaptionStyle = styled(CardContent)(() => ({
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  justifyContent: 'flex-end'
}));
const SectionStyle = styled(Card)(({ theme }) => ({
  width: '60vw',
  maxWidth: 240,
  height: '38vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(5),
  margin: theme.spacing(3)
}));
// ----------------------------------------------------------------------
export default function SelectProcedure({stage, newData}: AddPropertyProps) {
  const { t } = useTranslation();
  const content = [
    {title: t('addProperty.procSell'), icon: '/test.svg', id: 1},
    {title: t('addProperty.procRent'), icon: '/House.svg', id: 2},
    {title: t('addProperty.procManagement'), icon: '/test.svg', id: 3}
    ] 
  const onClickHandler = (String: string) => {
    let type = String.split(' ')[0].toLowerCase()
    if(type === 'vende'){
      type = 'Vender'
    }else if(type === 'arrienda'){
      type = 'Arrendar'
    }else{
      type = 'Gestionar'
    }
    const input = {data: type, stage: 0}
    newData(input);
    // action((String.split(' ')[0].toLowerCase()))
    stage(1)
  }
  return (
    <MotionContainer>  
      <Box sx={{ mt:10 }}>
        <Block>
        <Typography variant="h3" sx={{ mb: 2 }} align="center">
            {t('addProperty.procTitle')}
        </Typography>
        <m.div variants={varFade().inUp}>
            <Box sx={{
                display: 'grid',
                gap: 2,
                gridTemplateColumns: {
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                },
                }}>
            {
                content.map((item: {title: string ,icon: string,id: number}) => (
                    <span onClick = {() => onClickHandler(item.title)} key = {item.id}>
                    <SectionStyle sx={{
                    ':hover': {
                        boxShadow: 20, // theme.shadows[20]
                    },
                    }}>
                    <Image src={item.icon}/>
                    <CaptionStyle>
                        <Typography variant="h6" align='center'>{item.title}</Typography>
                    </CaptionStyle>    
                    </SectionStyle>
                    </span>
                ))
            }
            </Box>
        </m.div>
      </Block>
    </Box>
  </MotionContainer> 
  );
}