import { Button } from "@mui/material"
import { useTranslation } from "react-i18next"
import Iconify from "./Iconify"


export const BackButton = ({stage, newStage}: {stage: (newStage: number) => void, newStage: number}) =>{
    const { t } = useTranslation();
    return(
    <Button
        size="small"
        color="secondary"
        startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} width={20} height={20} />}
        onClick={() => stage(newStage)}>
        {'back'}
    </Button>
    )
}