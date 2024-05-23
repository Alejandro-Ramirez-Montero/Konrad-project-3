import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './styles.scss';

interface SignUpFormProps {
    showAlertMessage: boolean;
    setShowAlertMessage: (newShowAlertMessage: boolean) => void;
    handleSignUp: (email: string, fullName: string, password: string, confirmPassword: string) => void;
}

const SignUpForm:React.FC<SignUpFormProps> = ({showAlertMessage, setShowAlertMessage, handleSignUp}) => {
    const [email, setEmail] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const[validEmail, setValidEmail] = useState<boolean>(true);
    const[validPassword, setValidPassword] = useState<boolean>(true);
    const[validConfirmPassword, setValidConfirmPassword] = useState<boolean>(true);
    const[validForm, setValidForm] = useState<boolean>(false);
    const[alertMessage, setAlertMessage] = useState<string>('');

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>, setText: (text:string) => void) => {
        setText(e.target.value);
    }

    const validateEmail = (emailToValidate: string) => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setValidEmail(regexEmail.test(emailToValidate));
    }

    const validatePassword = (passwordToValidate: string) => {
        const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        setValidPassword(regexPassword.test(passwordToValidate));
    }

    const validateConfirmPassword = (passwordA:string, passwordB: string) => {
        setValidConfirmPassword(passwordA === passwordB);
    }

    const validateForm = () => {
        if(!validPassword){
            setAlertMessage('Password must be 8 characters long and include lowercase, uppercase and a number');
        }
        else if(!validConfirmPassword){
            setAlertMessage('Confirm Password does not match Password');
        }
        else{
            setAlertMessage('');
        }
        setValidForm(email && fullName && password &&confirmPassword && validEmail && validPassword && validConfirmPassword? true : false);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(validForm){
            handleSignUp(email.trim(), fullName.trim(), password.trim(), confirmPassword.trim());
        }
    }

    useEffect(() => {
        setShowAlertMessage(false);
        validateForm();
    },[email, fullName, password, confirmPassword]);


    return(
    <form className="sign-up-form" onSubmit={handleSubmit}>
        <h1 className='sign-up-form__title'>Create Account:</h1>
        <div className="sign-up-form__col">
            <label className='sign-up-form__label' htmlFor="email">Email: {!validEmail && <span className='sign-up-form__alert-message'>invalid</span>}</label>
            <input className='sign-up-form__input' type="text" id="email" value={email} placeholder='email...' onChange={(e:ChangeEvent<HTMLInputElement>)=> {handleTextChange(e, setEmail); validateEmail(e.target.value)}}/>
        </div>
        <div className="sign-up-form__col">
            <label className='sign-up-form__label' htmlFor="fullName">Full Name: </label>
            <input className='sign-up-form__input' type="text" id="fullName" value={fullName} placeholder='full name...' onChange={(e:ChangeEvent<HTMLInputElement>)=> {handleTextChange(e, setFullName);}}/>
        </div>

        <div className='sign-up-form__col-container'>
            <div className="sign-up-form__col">
                <label className='sign-up-form__label' htmlFor="password">Password: {!validPassword && <span className='sign-up-form__alert-message'>invalid</span>}</label>
                <input className='sign-up-form__input' type="password" id="password" value={password} placeholder='password...' onChange={(e:ChangeEvent<HTMLInputElement>)=> {handleTextChange(e, setPassword); validatePassword(e.target.value); validateConfirmPassword(e.target.value, confirmPassword)}}/>
            </div>
            <div className="sign-up-form__col">
                <label className='sign-up-form__label' htmlFor="confirmPassword">Confirm Password: {!validConfirmPassword && <span className='sign-up-form__alert-message'>invalid</span>}</label>
                <input className='sign-up-form__input' type="password" id="confirmPassword" value={confirmPassword} placeholder='confirm password...' onChange={(e:ChangeEvent<HTMLInputElement>)=> {handleTextChange(e, setConfirmPassword); validateConfirmPassword(e.target.value, password)}}/>
            </div>
        </div>
        <div className={`sign-up-form__alert-message ${showAlertMessage || alertMessage? '' : 'sign-up-form__alert-message--hide'}`}>{showAlertMessage? 'An account with this email already exists' : alertMessage}</div>
        <button className='sign-up-form__button' type="submit" disabled={!validForm}>Log In</button>
    </form>
    );
}

 export default SignUpForm;