import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './styles.scss';

interface LoginFormProps {
    showAlertMessage: boolean;
    setShowAlertMessage: (newShowAlertMessage: boolean) => void;
    handleLogin: (email: string, password: string) => void;
}

const LoginForm:React.FC<LoginFormProps> = ({showAlertMessage, setShowAlertMessage, handleLogin}) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const[validEmail, setValidEmail] = useState<boolean>(true);
    const[validForm, setValidForm] = useState<boolean>(false);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const validateEmail = (emailToValidate: string) => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setValidEmail(regexEmail.test(emailToValidate));
    }

    const validateForm = () => {
        setValidForm(email && password && validEmail? true : false);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(validForm){
            handleLogin(email.trim(), password.trim());
        }
    }

    useEffect(() => {
        setShowAlertMessage(false);
        validateForm();
    },[email, password]);


    return(
    <form className="login-form" onSubmit={handleSubmit}>
        <h1 className='login-form__title'>Login:</h1>
        <div className="login-form__col">
            <label className='login-form__label' htmlFor="email">Email: {!validEmail && <span className='login-form__alert-message'>invalid email</span>}</label>
            <input className='login-form__input' type="text" id="email" value={email} placeholder='email...' onChange={(e:ChangeEvent<HTMLInputElement>)=> {handleEmailChange(e); validateEmail(e.target.value)}}/>
        </div>

        <div className="login-form__col">
            <label htmlFor="password">Password:</label>
            <input className='login-form__input' type="password" id="password" value={password} placeholder='password...' onChange={handlePasswordChange}/>
        </div>
        <div className={`login-form__alert-message ${showAlertMessage? '' : 'login-form__alert-message--hide'}`}>Incorrect email or password</div>
        <button className='login-form__button' type="submit" disabled={!validForm}>Log In</button>
    </form>
    );
}

 export default LoginForm;