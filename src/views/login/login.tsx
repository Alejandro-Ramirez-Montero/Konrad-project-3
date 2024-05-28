import './login.scss'
import { useEffect, useState } from 'react';

import LoginForm from '../../components/login-form/login-form';
import { useRecoilState } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import { userTokenState } from '../../states/user-token';
import { requestLogin } from '../../utils/functions';

function Login() {
  const [showAlertMessage, setShowAlertMessage] = useState<boolean>(false);
  const [userToken, setUserToken] = useRecoilState<string | undefined>(userTokenState);
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    requestLogin(email, password)
    .then(token =>  setUserToken(token))
    .catch(error => setShowAlertMessage(true));
  }

  useEffect(() => {
    if(userToken){
      navigate('/', { replace: true });
    }
  },[userToken]);

  return (
      <main className="main main--padding-top-0">
        <div className="login">
          <img className="login__logo" src="/logo/logo.png" alt="CampGear logo"></img>
          <LoginForm showAlertMessage={showAlertMessage} setShowAlertMessage={setShowAlertMessage} handleLogin={handleLogin}/>
          <div style={{color: 'white'}}>Dont have an account? <Link to='/sign-up' className='login__link-to'>Sign Up</Link></div>
        </div>
      </main>
  )
}

export default Login
