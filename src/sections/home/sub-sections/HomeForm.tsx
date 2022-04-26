import { 
    Box,
    Button, 
    Card, 
    Stack, 
    Typography, 
    ButtonGroup, 
    styled, 
    Autocomplete, 
    TextField, 
    Slider, 
    InputAdornment, OutlinedInput, FormHelperText, FormControl, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import PricingPopOver from "./HomePricingPopover";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { AditionalInfo }  from "./HomeAditional";
import { Block } from "src/sections/overview/Block";

const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100vw',
    maxWidth: 385,
    height: '70vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: (theme as any).spacing(3)
}));
const cities = [
    {id: 1, label: 'Coquimbo'},
    {id: 2 , label: 'La serena'}
]
const tipos = [
    {id: 1, label: 'Departamento'},
    {id: 2, label: 'Casa'},
    {id: 3, label: 'Terreno'},
    {id: 4, label: 'Oficina'}
]
interface AditionalInfoType {
    habitaciones: Number,
    baños: Number
}
const LandingForm = () => {
    const [searchParameters,setParameters] = useState({});
    const [loadingBtn,setLoadingBtn] = useState([false,false])
    const [mainButtons,setMainButtons] = useState([true,false,false]);
    const btnColor = 'primary';
    const textfdSize= 'medium';

    const handleMainButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const value = (event.target as HTMLButtonElement).value;
        if(value === 'arrendar' && !mainButtons[0]){
            setMainButtons([true,false,false])
        }else if(value === 'comprar' && !mainButtons[1]){
            setMainButtons([false,true,false])
        }else if(value ==='vender' && !mainButtons[2]){
            setMainButtons([false,false,true])
        }
    };
    const handleLocationChange = (newLocation: string) => {
        setParameters({...searchParameters,location: newLocation});
    }
    const handleTypeChange = (newType: string) => {
        setParameters({...searchParameters,type: newType})
    }
    const handlePriceChange = (newPrice: Array<Number>) => {
        setParameters({...searchParameters,price: newPrice})
    }
    const handleAditionalChange = (newInfo: AditionalInfoType) => {
        setParameters({...searchParameters, aditionalInfo: newInfo})
    }
    useEffect(() => {
        console.log(searchParameters);
    },[searchParameters])
   
    return(
        <Block sx={{margin: -5}}>
        <SectionStyle>
            <Typography variant="h3" align="center"></Typography>
            
             <ButtonGroup sx={{my: 2}} size="small">
             <Box minWidth='5vw'>
                 <Stack>
                    <Button 
                    variant={mainButtons[0] ? "contained" : "text"} 
                    color={btnColor} 
                    onClick={handleMainButtonClick}
                    value="arrendar" 
                    sx={{display: 'flex',
                    flexDirection: 'column'}}>
                        Arrendar
                    </Button>
                 </Stack>
            </Box>
            <Box minWidth='5vw'>
                <Stack>
                    <Button 
                    variant={mainButtons[1] ? 'contained' : 'text'} 
                    value="comprar"
                    color={btnColor}
                    onClick={handleMainButtonClick} 
                    sx={{display: 'flex', flexDirection: 'column'}}>
                        Comprar
                    </Button>
                </Stack>
            </Box>
            <Box  minWidth='5vw'>
                <Stack>
                    <Button 
                    variant={mainButtons[2] ? 'contained' : 'text'}
                    value="vender" 
                    color={btnColor}
                    onClick={handleMainButtonClick} 
                    sx={{display: 'flex', flexDirection: 'column'}}>
                        Vender
                    </Button>
                </Stack>
            </Box>
            </ButtonGroup>
            <Container>
                <Autocomplete
                  fullWidth
                  disablePortal
                  autoHighlight
                  freeSolo
                  options={cities}
                  onChange = {(e,value) => value !== null ? handleLocationChange(value.label):null}
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <li {...props} >
                      <LocationOnIcon sx={{px: 0.5}}/>
                      {option.label}
                    </li>
                  )}
                  renderInput={(params) => (
                   
                    <TextField
                      {...params}
                      label="Ubicación"
                    //   value={searchParameters.location}
                        size={textfdSize}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password'
                      }}
                    />
                  )}
                />
                <Stack direction={{ xs: 'column', sm: 'row' }}>
                    <Autocomplete
                    fullWidth
                    disablePortal
                    autoHighlight
                    freeSolo
                    options={tipos}
                    onChange = {(_,value) => value!==null?handleTypeChange(value.label):null}
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option) => (
                        <li {...props}>
                        {option.label}
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label="Tipo"
                        size = {textfdSize}
                        inputProps={{
                            ...params.inputProps
                        }}
                        />
                    )}
                    />
                    <PricingPopOver saveState={handlePriceChange} size={textfdSize}/> 
                </Stack>
                <AditionalInfo saveState={handleAditionalChange} size={textfdSize}/>
                <Box>
                <LoadingButton
                fullWidth
                size="large"
                color={btnColor}
                variant="contained"
                sx={{my: 1}}
                loading = {loadingBtn[0]}
                onClick={() => setLoadingBtn([true,false])}
                >
                    Buscar
                </LoadingButton>
                <Typography align="center" variant="subtitle1">ó</Typography>
                <LoadingButton
                fullWidth
                size="large"
                color={btnColor}
                loading={loadingBtn[1]}
                variant="contained"
                sx={{my:1}}
                onClick={() => setLoadingBtn([false,true])}
                href="/login"
                >
                    Quiero gestionar
                </LoadingButton>
                </Box>
                </Container>
        </SectionStyle>
        </Block>
    )
}
export default LandingForm;