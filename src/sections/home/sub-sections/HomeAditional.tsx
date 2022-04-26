import { 
    Popover,
    Box,
    Typography,
    ButtonGroup,
    Button,
    Stack,
    TextField
} from '@mui/material'
import { useState } from "react";

const buttons = [
    {id: 1, label: '1'},
    {id: 2, label: '2'},
    {id: 3, label: '3'},
    {id: 4, label: '4'},
    {id: 5, label: '5'}
]

export const AditionalInfo = ({saveState,size}) => {
    const [buttonState, setButtonState] = useState(['1','1'])
    const [price, setPrice] = useState<number[]>([20, 37]);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
    const handleClose = () => {
        setAnchorEl(null);
        saveState({habitaciones: buttonState[0], baños: buttonState[1]})
    };
    const handleChangeButtonState = (btnlabel: string, level: number) => {
        level === 1 ?
        setButtonState([btnlabel,buttonState[1]]): setButtonState([buttonState[0],btnlabel]);
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
            label="Si"
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
                    Información adicional
                </Typography>
                <Box display="flex" justifyContent="center" alignContent="center" my={2}>
                    <Stack direction = 'column'>
                        <Box>
                            <Typography variant="subtitle1">Habitaciones</Typography>
                            <ButtonGroup>
                                {buttons.map(item => (
                                    <Button
                                    variant = {buttonState[0] === item.label ? 'contained' : 'outlined'}
                                    onClick={() => handleChangeButtonState(item.label, 1)} 
                                    key = {item.id}>{item.label !== '5' ? item.label: `${item.label}+`}</Button>
                                ))}
                            </ButtonGroup>
                        </Box>
                        <Box my={1}>
                            <Typography variant="subtitle1">Baños</Typography>
                            <ButtonGroup>
                                {buttons.map(item => (
                                    <Button
                                    variant = {buttonState[1] === item.label ? 'contained' : 'outlined'}
                                    onClick={() => handleChangeButtonState(item.label, 2)} 
                                    key = {item.id}>{item.label !== '5' ? item.label: `${item.label}+`}</Button>
                                ))}
                            </ButtonGroup>
                        </Box>
                    </Stack>
                </Box>
                <Button variant ="contained" onClick={handleClose}>
                    Listo
                </Button>
            </Box>
        </Popover>
        </>
    )}