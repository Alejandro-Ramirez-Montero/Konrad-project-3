import { ChangeEvent, FormEvent, useState } from 'react';
import './styles.scss';

interface LoginFormProps {
    showAlertMessage: boolean;
    setShowAlertMessage: (newShowAlertMessage: boolean) => void;
    handleLogin: (email: string, password: string) => void;
}

const LoginForm:React.FC<LoginFormProps> = ({showAlertMessage, setShowAlertMessage, handleLogin}) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleLogin(email.trim(), password.trim());
    }


    return(
    <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login:</h1>
        <div className="login-form__col">
            <label htmlFor="username">Email:</label>
            <input className='login-form__input' type="text" id="username" value={email} onChange={handleEmailChange}/>
        </div>

        <div className="login-form__col">
            <label htmlFor="password">Password:</label>
            <input className='login-form__input' type="password" id="password" value={password} onChange={handlePasswordChange}/>
        </div>
        <div className={`login-form__alert-message ${showAlertMessage? '' : 'login-form__alert-message--hide'}`}>Incorrect email or password</div>
        <button className='login-form__button' type="submit">Login</button>
    </form>
    );
}

 export default LoginForm;