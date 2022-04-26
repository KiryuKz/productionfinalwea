import { Card, Checkbox, Stack, styled, Typography, FormControlLabel, Box, ButtonGroup, Button, OutlinedInput, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { BackButton } from "../../components/BackButton";
import { fCurrency } from "../../utils/formatNumber";
import { AddPropertyProps } from ".";
import { Block } from '../../sections/overview/Block';
//animation
import { MotionContainer, varFade } from '../../components/animate';
import { m } from 'framer-motion';
import { ReactMarkdownNames } from "react-markdown/lib/ast-to-react";

const SectionStyle = styled(Card)(({ theme }) => ({
    width: '65vw',
    maxWidth: 400,
    height: '70vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(3)
}));

export default function Pricing({stage, newData}: AddPropertyProps){
    //*************** */
    const [checked, setChecked] = useState(true);
    const [currency, setCurrency] = useState({amount: '',type: 'clp'});
    const handleChangeCurrency = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value.length)
        if(event.target.value.length<20){
            var moneyDots = fCurrency(event.target.value);
            setCurrency({...currency,amount: moneyDots});
        }
        if(!event.target.value.length){
            setCurrency({...currency,amount: ''})
        }
    };
    const handleChangeCheckBox = () => {
        setChecked(!checked)
    };
    const onSubmit = async () => {
        const output = { data: currency, stage: 3};
        newData(output);
        stage(4);
    }
    const handleBtnClick = (event:  React.MouseEvent<HTMLButtonElement>) => {
        const value = (event.target as HTMLButtonElement).value;
        setCurrency({amount: currency.amount,type: value})
    }
    return(
    <MotionContainer sx={{mt: 5}}>
        <m.div variants={varFade().inUp}>
        <Block sx={{margin: -4}}>
        <SectionStyle>
            <Box>
            <Box display="flex" flexDirection="column" pb={3}>
                <Box alignItems="flex-start" justifySelf="flex-end">
                    <BackButton stage={stage} newStage={2}/>
                </Box>
                <Typography variant = "h4" align="center" >Ingrese precio estimado de su propiedad</Typography>
            </Box>
            <Stack direction={{ xs: 'column', sm: 'column' }} spacing={3}>
                <ButtonGroup sx={{display: 'flex', justifyContent: 'start'}}>
                    <Button
                    variant={currency.type === 'clp' ? 'contained':'outlined'}
                    value='clp'
                    onClick={handleBtnClick}>
                        CLP
                    </Button>
                    <Button
                    variant={currency.type === 'uf' ? 'contained':'outlined'}
                    value='uf'
                    onClick={handleBtnClick}>
                        UF
                    </Button>
                </ButtonGroup>
            <OutlinedInput 
                onChangeCapture={handleChangeCurrency}
                value={currency.amount !== '0' ? currency.amount: ''}
                endAdornment={<InputAdornment position="end">{currency.type.toUpperCase()}</InputAdornment>}
                />
            <FormControlLabel 
                control={<Checkbox />} 
                disabled={currency.amount ? true : false}
                label="No tengo un estimado" 
                onChange={handleChangeCheckBox}/>
            </Stack>
            <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled ={checked ? (!currency.amount?true:false) : false}
            sx = {{mt: 2, mb: 2}}
            onClick={onSubmit}
            >
            Siguiente
            </LoadingButton>
            </Box>
        </SectionStyle>
        </Block>
        </m.div>
    </MotionContainer>
    )
}
