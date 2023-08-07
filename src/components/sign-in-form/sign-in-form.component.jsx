import { useState } from 'react';

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import {signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils'

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const response = await signInAuthUserWithEmailAndPassword(email, password);
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
        <div className='sign-in-container'>
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
                <div className='buttons-container'>
                    <Button type="submit" >Sign in</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle} >Google Sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;