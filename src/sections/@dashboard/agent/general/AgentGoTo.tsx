import merge from 'lodash/merge';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Typography, Stack, CardProps, Button } from '@mui/material';
// utils
import { fNumber, fPercent } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(1),
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string;
  total: number;
  icon: string;
  button: string;
  chartColor: string;
}

export default function AgentGoTo({
  title,
  total,
  icon,
  button,
  chartColor,
  sx,
  ...other
}: Props) {
  

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, ...sx }} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" paragraph>
          {title}
        </Typography>
      
        
        <Stack direction="column">
        <IconWrapperStyle>
            <Iconify icon={icon}></Iconify>
        </IconWrapperStyle>
        <Typography variant={ title==="Agenda"? 'subtitle1':'h3'} gutterBottom>
          {title==='Agenda' && "Compromisos pendientes: "} {fNumber(total)}
        </Typography>
          
        </Stack>
        <Button variant="outlined">{button}</Button>
      </Box>
    </Card>
  );
}