import { 
    Popover,
    Box,
    Typography,
    ButtonGroup,
    Button,
    Stack,
    OutlinedInput,
    FormHelperText,
    Slider,
    InputAdornment, 
    TextField
} from '@mui/material'
import { useState } from "react";

const prices = [
    { value: 0, label: '$0' },
    { value: 25, label: '250' },
    { value: 50, label: '500' },
    { value: 75, label: '750' },
    { value: 1000, label: '1000' },
  ];
function valuePrice(value: number) {
    return value > 0 ? `$${value}0` : `${value}`;
}
function valueLabelFormatPrice(value: number) {
    return value > 0 ? `$${value}` : value;
  }

const PricingPopOver = ({saveState,size}) => {
    const [currency, setCurrency] = useState('CLP')
    const [price, setPrice] = useState<number[]>([20, 37]);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
    const handleClose = () => {
        setAnchorEl(null);
        saveState(price);
    };
    const handleChangePrice = (event: Event, newValue: number | number[]) => {
        setPrice(newValue as number[]);
        console.log(newValue)
    };
    const handleChangeCurrency = (event: React.MouseEvent) => {
        setCurrency((event.target as HTMLButtonElement).value === 'CLP'? 'CLP' : 'UF' )
    }
    const handleChangeMin = (event) => {
        const newValue = event.target.value;
        if(newValue <=price[1]){
            setPrice(newValue);
        }
       
    }

    const [hover, setHover] = useState<HTMLElement | null>(null);

   
    const handleHoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setHover(event.currentTarget);
    };
    const handleHoverClose = () => {
        setHover(null);
    };
    
    return(
        <>
        <TextField
            fullWidth
            disabled
            size={size}
            onClick={handleClick}
        // value={currency}
            label="Precio"
        />          
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
            }}
        >
            <Box sx={{ p: 2, maxWidth: 300 }}>
                <Typography variant="subtitle1" gutterBottom>
                    Ingrese rango de precio
                </Typography>
                <Box display="flex" justifyContent="center" alignContent="center" my={2}>
                <ButtonGroup>
                    <Button
                    variant={currency === 'CLP' ? 'contained' : 'outlined'} 
                    onClick={handleChangeCurrency} value="CLP">CLP</Button>
                    <Button 
                    variant={currency === 'UF' ? 'contained' : 'outlined'}
                    onClick={handleChangeCurrency} value="UF">UF</Button>
                </ButtonGroup>
                </Box>
                    <Stack direction={'row'} spacing={5}>
                       
                        <Stack direction={'row'}>
                        <Box>
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            type='number'
                            size="small"
                            value={price[0]}
                            // onChange={e}
                            endAdornment={<InputAdornment position="end">{currency}</InputAdornment>}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                            'aria-label': 'weight',
                            }}
                        />
                        <FormHelperText id="outlined-weight-helper-text">Mínimo</FormHelperText>
                        </Box>
                        <Box>
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            value={price[1]}
                            size="small"
                            type='number'
                            // onChange={handleChange('weight')}
                            endAdornment={<InputAdornment position="end">{currency}</InputAdornment>}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                            'aria-label': 'weight',
                            }}
                        />
                        <FormHelperText id="outlined-weight-helper-text">Máximo</FormHelperText>
                        </Box>
                    </Stack>
                  
                    </Stack>
                <Box sx={{ width: '100%' }}>
                <Slider
                // scale={(x) => x * 10}
                step={1}
                marks={prices}
                value={price}
                onChange={handleChangePrice}
                valueLabelDisplay="on"
                getAriaValueText={valuePrice}
                valueLabelFormat={valueLabelFormatPrice}
                />
                </Box>
                <Button onClick={handleClose}>
                    Listo
                </Button>
            </Box>
        </Popover>
        </>
    )
}
export default PricingPopOver;