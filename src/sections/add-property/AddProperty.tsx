import { styled } from '@mui/material/styles';
import { Box, Card, Typography, CardContent } from '@mui/material';
// utils
import { useTranslation } from 'react-i18next';
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import { BackButton } from '../../components/BackButton';
//animation
import { MotionContainer, varFade } from '../../components/animate';
import { m } from 'framer-motion';
// ----------------------------------------------------------------------
import { Block } from '../../sections/overview/Block';
import { AddPropertyProps } from '.';
const CaptionStyle = styled(CardContent)(({ theme }) => ({
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  justifyContent: 'flex-end'
}));
const SectionStyle = styled(Card)(({ theme }) => ({
  width: '60vw',
  maxWidth: 230,
  height: '37vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(5),
  margin: theme.spacing(3)
}));
// ----------------------------------------------------------------------
export default function Pricing({stage,newData}: AddPropertyProps){
    const { t } = useTranslation();
    const content = [
        {title: t('addProperty.selHouse'), icon: '/test.svg', id: 1},
        {title: t('addProperty.selApartment'), icon: '/House.svg', id: 2},
        {title: t('addProperty.selComercial'), icon: '/test.svg', id: 3},
        {title: t('addProperty.selLand'), icon: '/House.svg', id: 4}
        ]
  const handleClick = (type: string) => {
    const output = {data: type, stage: 1};
    newData(output);
    stage(2);
  }
  return (
    <MotionContainer>
        <Box>
            <Block>
                <BackButton stage={stage} newStage={0} />
                <Typography variant="h4" sx={{ mb: 3 }} align="center">
                    {t('addProperty.selTitle')}
                </Typography>
                <m.div variants={varFade().inUp}>
                    <Box
                    sx={{
                        display: 'grid',
                        gap: 3,
                        gridTemplateColumns: {
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(4, 1fr)',
                        },
                    }}
                    >
                    {
                        content.map((item: {title: string ,icon: string,id: number}) => (
                        <span onClick={() => handleClick(item.title)} key = {item.id}>
                            <SectionStyle sx={{
                            ':hover': {
                            boxShadow: 20, // theme.shadows[20]
                            },
                            }}>
                            <Image src={item.icon}/>       
                            <CaptionStyle>
                            <Typography variant="h6">{item.title}</Typography>
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