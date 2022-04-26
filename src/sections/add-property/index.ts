export {default as Procedure} from './AddProcedure'
export {default as Property} from './AddProperty'
export {default as Direction} from './AddDirection'
export {default as Pricing} from './AddPricing'
export {default as Features} from './AddFeatures'
export {default as FinalStep} from './AddFinalStep'
import _ from 'lodash'
import { useRef } from 'react'

export type AddPropertyProps = {
    stage: (newStage: number) => void;
    newData: (newData: any) => void;
}
const data = [
    {priority: 1, date: 1650252510851, id: 90213},
    {priority: 2, date: +new Date, id: 12309},
    {priority: 1, date: 1650252510851, id: 12309023}
]
export async function AssignAgent(){
    const selectedAgent = useRef<typeof data[0]>();
     _.map(data, function filter(value){
        selectedAgent.current = value;
        console.log(selectedAgent)       
    })    
}
