import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import { SignInContainer, ButtonContainer } from './sign-in-form.styles';
import { gooleSignInStart, emailSignInStart } from '../../store/user/user.action';



const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const signInWithGoogle = () => {
        dispatch(gooleSignInStart());
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        }
        catch (error){
            switch (error.code){
                case 'auth/wrong-password':
                case 'auth/user-not-found':
                    alert('Email or password is wrong');
                    break;
                default:
                    console.log(error);
                    break;
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    };

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                    label="Email" 
                    inputOptions = {{
                        type: 'email', 
                        required: true, 
                        onChange: handleChange, 
                        name: "email", 
                        value: email,
                    }}/>   

                <FormInput 
                    label="Password" 
                    inputOptions = {{
                        type: 'password', 
                        required: true, 
                        onChange: handleChange, 
                        name: "password", 
                        value: password,
                    }}/>
                <ButtonContainer>
                    <Button type="submit" >Sign in</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle} >Google Sign in</Button>
                </ButtonContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;