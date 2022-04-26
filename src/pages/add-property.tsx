import {
    Procedure,
    Property,
    Direction,
    Pricing,
    Features,
    FinalStep
} from '../sections/add-property'
//layouts
import Layout from '../layouts';
import { styled } from '@mui/material';
import { useEffect, useState } from 'react';
//animation


export const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    }
}));
export const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: '100%',
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(7, 0),
}));

AddProperty.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="main">{page}</Layout>;
};

export default function AddProperty(){
    const [stage,setStage] = useState<Number>(2);
    const [data,setData] = useState([] as any)
    const NewStage = (set: Number) => {
        setStage(set);
    }
    const changeData = (newData: any) => {
        setData( (prevState: any) =>  {
            const filtered = prevState.filter( item  => item.stage !== newData.stage)
            return [...filtered, newData]
        })
    }
    useEffect(() => {
        console.log(data)
    })
    return(
        <RootStyle>
            <ContentStyle>
                { stage === 0 && <Procedure stage={NewStage} newData={changeData}/>}
                { stage === 1 && <Property stage={NewStage} newData={changeData}/>}
                { stage === 2 && <Direction stage={NewStage} newData={changeData}/>}
                { stage === 3 && <Pricing stage={NewStage} newData={changeData}/>}
                { stage === 4 && <Features stage={NewStage} newData={changeData}/>}
                { stage === 5 && <FinalStep />}
            </ContentStyle> 
        </RootStyle>
    )
}