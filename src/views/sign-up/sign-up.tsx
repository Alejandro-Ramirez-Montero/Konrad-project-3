import './sign-up.scss'
import { useEffect, useState } from 'react';

import SignUpForm from '../../components/sign-up-form/sign-up-form';
import { useRecoilValue } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import { requestSignUp } from '../../utils/functions';
import { userTokenState } from '../../states/user-token';

function SignUp() {
  const [showAlertMessage, setShowAlertMessage] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const userToken = useRecoilValue<string | undefined>(userTokenState);
  const navigate = useNavigate();


  const handleSignUp = (email: string, password: string, fullName: string) => {
    requestSignUp(email, password, fullName)
    .then(response => setShowSuccessMessage(true))
    .catch(error => setShowAlertMessage(true));
  }

  useEffect(() => {
    if(userToken){
      navigate('/', { replace: true });
    }
  },[userToken]);

  return (
      <main className="main main--padding-top-0">
        <div className="sign-up">
          <img className="sign-up__logo" src="/logo/logo.png" alt="CampGear logo"></img>
          <SignUpForm showAlertMessage={showAlertMessage} showSuccessMessage={showSuccessMessage} setShowAlertMessage={setShowAlertMessage} setShowSuccessMessage={setShowSuccessMessage} handleSignUp={handleSignUp}/>
          <div style={{color: 'white'}}>Already have an account? <Link to='/login' className='sign-up__link-to'>Login</Link></div>
        </div>
      </main>
  )
}

export default SignUp
