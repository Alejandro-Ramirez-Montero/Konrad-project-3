import './sign-up.scss'
import { useEffect, useState } from 'react';

import SignUpForm from '../../components/sign-up-form/sign-up-form';
import { useRecoilState } from 'recoil';
import { loggedUserState } from '../../states/logged-user';
import { Link, useNavigate } from 'react-router-dom';

interface LoggedUserInterface {
  email: string;
  name: string;
  password: string;
}

function SignUp() {
  const [showAlertMessage, setShowAlertMessage] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useRecoilState<LoggedUserInterface | undefined>(loggedUserState);
  const navigate = useNavigate();


  //Conectar sign up con backend
  const handleSignUp = (email: string, fullName:string, password: string, confirmPassword: string) => {
    fetch('../../../users.json')
    .then(response => response.json())
    .then((data: Array<LoggedUserInterface>) => {
      const user = data.find(user => user.email === email && user.password == password);
      return user;
    })
    .then(user => {
      if(!user){
        
      }
      else{
        setShowAlertMessage(true);
      }
    })
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
        <div className="sign-up">
          <img className="sign-up__logo" src="/logo/logo.png" alt="CampGear logo"></img>
          <SignUpForm showAlertMessage={showAlertMessage} setShowAlertMessage={setShowAlertMessage} handleSignUp={handleSignUp}/>
          <div style={{color: 'white'}}>Already have an account? <Link to='/login' className='sign-up__link-to'>Login</Link></div>
        </div>
      </main>
  )
}

export default SignUp
