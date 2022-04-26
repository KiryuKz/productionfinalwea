import { Auth,API,graphqlOperation } from 'aws-amplify' 
export { default as RegisterForm } from './RegisterForm';

type RegisterProps = {
    email: string;
    password: string;
    phone_number: string;
    firstName: string;
    lastName: string;
}

export default async function Register(data: RegisterProps, toggle: () => void, triggerError: (err: string) => void){
    const { email,password, phone_number, firstName,lastName} = data;
    try{
        await Auth.signUp({
            username: email,
            password: password,
            attributes: {
                email,
                phone_number,
                family_name: firstName,
                middle_name: lastName
            }
        })
        toggle();
    }catch(err){
        switch(err.code){
            case 'UsernameExistsException':
                triggerError('Este usuario ya <h1>existe</h1>');
                break;
            default:
                break;
        }
    }
}