import { Box, Button, ButtonGroup, Card, Fab, FormHelperText, InputAdornment, OutlinedInput, Pagination, Stack, styled, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { MotionContainer, varFade } from '../../components/animate';
import { m } from 'framer-motion';
import { BackButton } from "../../components/BackButton";
import { fCurrency } from "../../utils/formatNumber";
import { Block } from '../../sections/overview/Block';
const SectionStyle = styled(Card)(({ theme }) => ({
    width: '65vw',
    maxWidth: 400,
    height: '70vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(7)
}));

export default function Features({stage, newData}: {stage: (newStage: number) => void, newData: (newData: any) => void}){
    const [localStage, setLocalStage] = useState(0);
    const [sectionData,setSectionData] = useState([] as Array<any>);
    const localData = (data: any) => {
        setSectionData((prev) => [...prev, data])
    }
    useEffect(() => {
        if(sectionData.length === 3) {
            const output = { data: sectionData, stage: 4};
            // newData(output);
            stage(5);
        }
    },[sectionData])
    return(
    <MotionContainer sx={{mt: 5}}>
        <m.div variants={varFade().inUp}>
    <Block sx={{margin: -3}}>
        <SectionStyle>  
            <Box pb={2} maxWidth="100%" width="100%">
                <Box height='50px'>
                <BackButton stage={stage} newStage={3}/>
                </Box>
                <Typography variant="h4" align="center">Hablemos de</Typography>
            </Box>
            {localStage === 0 && <FirstStage setLocalStage={setLocalStage} localData={localData}/>}
            {localStage === 1 && <SecondStage setLocalStage={setLocalStage} localData={localData}/>}
            {localStage === 2 && <ThirdStage stage={stage} localData={localData} newData={newData}/>}
            {/* <Box justifyContent="flex-end">
                <Pagination count={3} size="small" />
            </Box> */}
        </SectionStyle>
    </Block>
    </m.div>
    </MotionContainer>
    )
}
function numberWithDots(x) {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
const FirstStage = ({setLocalStage,localData}: {setLocalStage: (newLocalStage: number) => void, localData: (data: any) => void}) => {
    const [dataProp,setDataProp] = useState({'habitaciones': 0, 'baños': 0, 'estacionamientos': 0})
    const [clicked,setClicked] = useState([10,10,10])
    const onClickHandler = (type: string, cantidad: number) => {
        let temp = dataProp;
        switch(type){
            case 'habitaciones':
                temp.habitaciones = cantidad;
                setClicked([cantidad,clicked[1],clicked[2]])
                break;
            case 'baños':
                temp.baños = cantidad;
                setClicked([clicked[0],cantidad,clicked[2]])
                break;
            case 'est': 
                temp.estacionamientos = cantidad-1;
                setClicked([clicked[0],clicked[1],cantidad])
                break;
        }
        setDataProp(temp)
    }
    const onNextStageHandler = () => {
        localData(dataProp)
        setLocalStage(1)
    }
    return(
        <Stack direction={{ xs: 'column', sm: 'column' }} spacing={3} maxWidth="100%" width="100%">
            <Box>
                <Typography variant="subtitle1">¿Habitaciones?</Typography>
                <Box display="flex" py={1}>
                <Stack direction={{ xs: 'row', sm: 'row' }} spacing={3}>
                    <ButtonGroup>
                {Array.from(Array(5).keys()).map( i => (
                    <Button 
                    key={i}
                    variant={clicked[0] === (i+1) ? 'contained' : 'outlined'} 
                    size="medium" 
                    onClick={() => onClickHandler('habitaciones',(i+1))}>{!(i === 4) ? (i+1) : `${i+1}+`}</Button>  
                ))}
                </ButtonGroup>
                </Stack>
            </Box>
            </Box>
            <Box my={1}>
                <Typography variant="subtitle1">¿Baños?</Typography>
                <Box display="flex" py={1}>
                    <Stack direction={{ xs: 'row', sm: 'row' }} spacing={3}>
                        <ButtonGroup>
                    {Array.from(Array(5).keys()).map( i => (
                        <Button 
                        key = {i} 
                        size="medium"
                        variant={clicked[1] === (i+1) ? 'contained' : 'outlined'}  
                        onClick={() => onClickHandler('baños',(i+1))}>{!(i === 4) ? (i+1) : `${i+1}+`}</Button>   
                    ))}
                    </ButtonGroup>  
                    </Stack>
                </Box>
            </Box>
            <Box my={1}>
                <Typography variant="subtitle1">¿Estacionamientos?</Typography>
                <Box display="flex" py={1}>
                    <Stack direction={{ xs: 'row', sm: 'row' }} spacing={3}>
                        <ButtonGroup>
                    {Array.from(Array(6).keys()).map( i => (
                        <Button 
                        key = {i} 
                        size="medium"
                        variant={clicked[2] === (i+1) ? 'contained' : 'outlined'}  
                        onClick={() => onClickHandler('est',(i+1))}>{!(i === 5) ? (i) : `${i}+`}</Button>   
                    ))}
                    </ButtonGroup>  
                    </Stack>
                </Box>
            </Box>  
            <LoadingButton 
            variant = "contained"
            disabled={clicked[0] === 10 || clicked[1] === 10 || clicked[2] === 10 ? true : false}
            size="large" 
            sx={{my: 3}} 
            onClick={() => {onNextStageHandler()}}>Siguiente</LoadingButton>
        </Stack>
    )
}

const SecondStage = ({setLocalStage,localData}: {setLocalStage: (newLocalStage: number) => void,localData: (data: any) => void}) => {
    const [area,setArea] = useState({total: '', util:''});
    const [unit, setUnit] = useState('m2');
    const handleChangeInput = (event,tipo) => {
        if(event.target.value.length <=7){
            if(tipo === 'util'){
                setArea({...area,util: fCurrency(event.target.value)})
            }
            else{
                setArea({...area,total: fCurrency(event.target.value)})
            }
        }
    }
    const handleButtonClick = (event) => {
        const value = (event.target as HTMLButtonElement).value
        if(value !== unit){
            setUnit(value);
        }
    }
    const onSubmit = () => {
        const output = {area, unit};
        localData(output);
        setLocalStage(2);
    }
    useEffect(() => {
        console.log(area);
    },[area])
    return(
        <Box>
            <Stack spacing={2}>
                <ButtonGroup sx={{display: 'flex', justifyContent: 'center'}}>
                    <Button 
                    variant={unit === 'm2' ? 'contained' : 'outlined'} 
                    onClick={handleButtonClick}
                    sx={{textTransform: "none"}}
                    value="m2">m <sup><sup>2</sup></sup></Button>
                    <Button 
                    variant={unit === 'h' ? 'contained' : 'outlined'}
                    onClick={handleButtonClick}
                    value="h">Hectáreas</Button>
                </ButtonGroup>
                <Stack direction='row' spacing={1}>
                    <Box>
                        <TextField
                        name = "m2total"
                        value={area.total !=='0' ? area.total : ''}
                        onChange={(e) => handleChangeInput(e,'total')}
                        InputProps={{
                            endAdornment:<InputAdornment position="end">{unit === 'm2' ? <span>m<sup>2</sup></span>: unit}</InputAdornment>
                        }}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                        'aria-label': 'weight',
                        }}/>
                        <FormHelperText id="outlined-weight-helper-text">{unit ==='h' ? 'Hectáreas totales': 'Metros cuadrados totales'}</FormHelperText>
                    </Box>
                    <Box>
                        <TextField
         
              
                        onChange={(e) => handleChangeInput(e,'util')}
                        value={area.util !=='0' ? numberWithDots(area.util) : ''}
                        InputProps={{
                            endAdornment:<InputAdornment position="end">{unit === 'm2' ? <span>m<sup>2</sup></span>: unit}</InputAdornment>
                        }}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                        'aria-label': 'weight',
                        }}/>
                        <FormHelperText 
                        id="outlined-weight-helper-text">{unit ==='h' ? 'Hectáreas útiles': 'Metros cuadrados útiles'}</FormHelperText>
                    </Box>
                </Stack>
            </Stack>
            <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={onSubmit}
            disabled={false}
            sx = {{mt: 2, mb: 2}}
            >
            Siguiente
            </LoadingButton>
        </Box>
    )
}
const utils = [
    {id: 1, label: 'Mascotas'},
    {id: 2, label: 'Piscina'},
    {id: 3, label: 'Jardín'},
    {id: 4, label: 'Patio'},
    {id: 5, label: 'Terraza'},
    {id: 6, label: 'no'},
    {id: 7, label: 'xd'},
    {id: 8, label: 'SISI'}
]
const firstArray = utils.filter(item => {return item.id <=4})
const secondArray = utils.filter(item => {return item.id >4});
const ThirdStage = ({stage,localData}: {stage: (newStage: number) => void,localData: (data: any) => void}) =>{
    const [btnState,setBtnState] = useState([]);
    const [loading,setLoading] = useState(false);
    const onNextStageHandler = () =>{
        localData(btnState)
        setLoading(true);
    }
    const handlerBtnClick = (newState: string) => {
        if(btnState.includes(newState)){
            setBtnState(btnState.filter(item => item!==newState));
        }else{
            setBtnState([...btnState,newState])
        }
        console.log(btnState);
    }

    return(
        <Stack spacing={4} mb={2}  maxWidth="100%" width="100%">
            <Box display="flex" flexDirection="column">
                <ButtonGroup sx={{display: 'flex', justifyContent: 'center'}}>
                    <Stack direction='column'>
                        <Stack direction='row'>
                        {firstArray.map(item => (
                            <Button key={item.id} 
                            variant={btnState.includes(item.label) ? 'contained' : 'outlined'}
                            onClick={() => handlerBtnClick(item.label)}>
                                {item.label}                     
                            </Button>
                            
                        ))}
                        </Stack>
                        <Stack direction='row'>
                        {secondArray.map(item => (
                            <Button key={item.id} 
                            variant={btnState.includes(item.label) ? 'contained' : 'outlined'}
                            onClick={() => handlerBtnClick(item.label)}>
                                {item.label}                     
                            </Button>
                            
                        ))}
                        </Stack>
                    </Stack>
                </ButtonGroup>
            </Box>
            <LoadingButton 
            size="large"
            variant="contained"
            loading={loading}
            onClick={() => onNextStageHandler()}>
                Siguiente
            </LoadingButton>
        </Stack>
    )
}