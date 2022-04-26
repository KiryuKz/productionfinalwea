import { Auth,API,graphqlOperation } from 'aws-amplify'
import { useRouter } from 'next/router'
import { PATH_DASHBOARD, PATH_PAGE } from '../../../routes/paths'
type FormLoginProps = {
    email: string;
    password: string;
    isAgent: boolean;
}
export { default as LoginForm } from './LoginForm';
export default async function Login(data: FormLoginProps){
    const { email, password, isAgent } = data;
    const { push } = useRouter(); 
    try{
        
        if(!isAgent){
            const user = await Auth.signIn(email,password);
            const userGQL = await API.graphql(graphqlOperation(getUserProperties,{id: user.username}))
            console.log(userGQL)
            if(!(userGQL as any).data.getUser){
                //Primer login -> se añade a la db  
                let { attributes } = user;
                let input = {
                    id: attributes.sub,
                    firstName: attributes.family_name,
                    lastName: attributes.middle_name,
                    email: attributes.email,
                    phoneNumber: attributes.phone_number,
                    plan: 'default',
                    type: [''],
                    verified: false,
                    properties: []
                }
            }
            else{
                if(!(userGQL as any).data.getUser.type.length){
                    //Usuario sin completar el primer form para añadir propiedad
                    push(PATH_PAGE.addProperty)
                }else{
                    push(PATH_DASHBOARD.root)
                }
            }
        }else{
            //Agente
            await Auth.signIn(email,password)
            push(PATH_DASHBOARD.root_agent)
        }
        
        
        if((userGQL as any).data.getUser!==null){    
            if(!(userGQL as any).data.getUser.type.length){
                push(PATH_PAGE.property_management);
            }else{
                push(PATH_DASHBOARD.root)
            }
        }else{
            
            const domain = attributes.email.split('@')[1] === 'plotmy.com' ? true : false
            if(!domain){
                
                await API.graphql(graphqlOperation(createUser, { input }))
                router.push(PATH_PAGE.property_management);
            }else{
                const input = {
                    id: user.username,
                    organization: '',
                    clients: []
                }
                await API.graphql(graphqlOperation(createAgent, {input}))
                router.push(PATH_DASHBOARD.root);
            }
        }
    }catch(err){
        console.log(err);
        if((err as Error).message === 'User is not confirmed.'){
            setError({active: true, message: (err as Error).message});
            handleUserData(email)
        }
    }           
}