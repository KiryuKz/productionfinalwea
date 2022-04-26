import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createUser,createAgent } from '../../../graphql/mutations'
import { useRouter } from 'next/router';
import { PATH_PAGE } from 'src/routes/paths';
export { default as VerifyCodeForm } from './VerifyCodeForm';

type VerifyProps = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone_number: string;
    confirmPassword: string;
    isAgent: boolean;
    code: string;
}
function pushTo(){
    const { push } = useRouter();
    push(PATH_PAGE.login)
}
export async function VerifyUser(data: VerifyProps, handleErrorChange: (err: string) => void){
    const { email,password,firstName,lastName, phone_number,code, isAgent } = data;
    try{
        await Auth.confirmSignUp(email,code);
        const user = await Auth.signIn(email,password);
        await Auth.signOut();
        const { attributes } = user;
        if(!isAgent){
            const input = {
                id: attributes.sub,
                firstName,
                lastName,
                email,
                phoneNumber: phone_number,
                plan: 'default',
                type: [''],
                verified: false,
                properties: [] 
            }
            await API.graphql(graphqlOperation(createUser, {input}))
        }else{
            const input = {
                id: attributes.sub,
                organization: "Plotmy",
                clients: []
            }
            await API.graphql(graphqlOperation(createAgent, {input}))  
        }
        pushTo();
    }catch(err){
        console.log(err.code)
        switch(err.code){
            case 'CodeMismatchException':
                handleErrorChange('Código equivocado');
                break;
            default:
                break;
        }
    }
}