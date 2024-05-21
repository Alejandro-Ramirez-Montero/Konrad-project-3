import './login.scss'
import { useEffect, useState } from 'react';

import LoginForm from '../../components/login-form/login-form';
import { useRecoilState } from 'recoil';
import { loggedUserState } from '../../states/logged-user';
import { useNavigate } from 'react-router-dom';

interface LoggedUserInterface {
  email: string;
  name: string;
  password: string;
}

function Login() {
  const [showAlertMessage, setShowAlertMessage] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useRecoilState<LoggedUserInterface | undefined>(loggedUserState);
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    fetch('../../../users.json')
    .then(response => response.json())
    .then((data: Array<LoggedUserInterface>) => {
      const user = data.find(user => user.email === email && user.password == password);
      return user;
    })
    .then(user => user? setLoggedUser(user) : setShowAlertMessage(true))
    .catch();
  }

  useEffect(() => {
    if(loggedUser){
      //localStorage.setItem('user', JSON.stringify(loggedUser));
      navigate('/', { replace: true });
    }
  },[loggedUser]);

  return (
      <main className="main main--padding-top-0">
        <div className="login">
          <img className="login__logo" src="/logo/logo.png" alt="CampGear logo"></img>
          <LoginForm showAlertMessage={showAlertMessage} setShowAlertMessage={setShowAlertMessage} handleLogin={handleLogin}/>
        </div>
      </main>
  )
}

export default Login
