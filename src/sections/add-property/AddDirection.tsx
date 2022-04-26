import {  Stack, Typography,Card, Box, MenuItem, styled, TextField } from "@mui/material";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";
import FormProvider from "../../components/hook-form/FormProvider";
import RHFTextField from "../../components/hook-form/RHFTextField";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { LoadingButton } from "@mui/lab";
import NextLink from 'next/link'
import { useTranslation } from "react-i18next";
import { BackButton } from "../../components/BackButton";
//animation
import { MotionContainer, varFade } from '../../components/animate';
import { m } from 'framer-motion';
import { Block } from '../../sections/overview/Block';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { AssignAgent } from ".";

const REGIONS = [
    { value: 'IV', label: 'Región de Coquimbo'}
]

type FormValuesProps = {
    region: string;
    comuna: string;
    barrio: string;
    afterSubmit?: string;
};

const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100vw',
    maxWidth: 360,
    height: '70vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: (theme as any).spacing(3)
}));
export default function Direction({stage, newData}: {stage: (newStage: number) => void, newData: (newData: any) => void}){
    const [region,setRegion] = useState('');
    const { t } = useTranslation();
    const [localStages,setLocalStages] = useState(0)
    const [disabled,setDisabled] = useState(false)
    const RegisterSchema = yup.object().shape({
        region: yup.string(),
        comuna: yup.string(),
        barrio: yup.string()
    });
    AssignAgent()
    // const geocoder = new MapboxGeocoder({
    //     accessToken: 'pk.eyJ1Ijoic3RoeW1hIiwiYSI6ImNrcnFycDlzNjFxM3Uydm1vMGNxd200amsifQ.aTXBxeiEvrCesxbO8OuFEg',
    //     mapboxgl: mapboxgl
    // })
    // console.log(geocoder)
    const defaultValues = {
        region: '',
        comuna: '',
        barrio: ''
    };
    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    });
    const {
        handleSubmit,
        formState: { isSubmitting },
        } = methods;
    const onSubmit = async (data: FormValuesProps) => {
        data.region = region;
        const output = { data ,stage: 2 };
        // newData(output);
        stage(3);
    }
    const handleChangeRegion = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRegion(event.target.value);
        setLocalStages(1)
    }
    const handleChangeComuna = (event: FormEvent<HTMLDivElement>) => {
        setLocalStages(2)
    }
    return(
    <MotionContainer sx={{mt: 6}}>
        <Block sx={{margin: -4}}>
        <m.div variants={varFade().inUp}>  
        <SectionStyle>
            <Box pb={3}>
                <BackButton stage={stage} newStage={1} />
                <Typography variant="h4" align="center">{t('addProperty.dirTitle')}</Typography>
            </Box>
            <FormProvider methods = {methods} onSubmit={handleSubmit(onSubmit)}>        
            <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
                <Box>
                <TextField
                select
                fullWidth
                name="region"
                label="Región"
                value={region}
                onChange={handleChangeRegion}
                helperText={t('addProperty.dirRegion')}
                >
                {REGIONS.map((option) => (
                    <MenuItem key={option.value} value={option.label}>
                    <Box display="flex" justifyContent="center" alignContent="center"><LocationOnIcon />{option.label}</Box>
                    </MenuItem>
                ))}
                </TextField>
                </Box>
                <RHFTextField 
                name="comuna" 
                label="Comuna"
                disabled={localStages ? false : true}
                onChangeCapture={handleChangeComuna}
                helperText="Seleccione una comuna"/>
                <RHFTextField 
                name="barrio" 
                label="Barrio"
                disabled={localStages===2 ? false : true}
                // onChangeCapture={e.target => {console.log(e.target)}}
                helperText="Seleccione un barrio"/>
            </Stack>
            <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx = {{mt: 2, mb: 2}}
            loading={isSubmitting}
            disabled={disabled}
            >
            Siguiente
            </LoadingButton>
            </FormProvider>
        </SectionStyle>
        </m.div>
        </Block>
    </MotionContainer>
    )
}