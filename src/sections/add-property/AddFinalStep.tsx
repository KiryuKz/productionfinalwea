// @mui
import { styled } from '@mui/material/styles';
import { Box, Paper, Container } from '@mui/material';
// components

// sections
import { Block } from '../../sections/overview/Block';
import CustomizedStepper from '../../sections/overview/mui/stepper/CustomizedStepper';
import VerticalLinearStepper from '../../sections/overview/mui/stepper/VerticalLinearStepper';
//animation
import { MotionContainer, varFade } from '../../components/animate';
import { m } from 'framer-motion';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function FinalStep() {
  return (
    <MotionContainer>
        <m.div variants={varFade().inUp}>
      <RootStyle>
        <Container>
            <Block title="Siguientes pasos">
              <Paper
                sx={{
                  p: 3,
                  width: '100%',
                  boxShadow: (theme) => theme.customShadows.z8,
                }}
              >
                <VerticalLinearStepper />
              </Paper>
            </Block>
        </Container>
      </RootStyle>
      </m.div>
    </MotionContainer>
  );
}


