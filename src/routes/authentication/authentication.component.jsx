// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';
// import { 
//   //auth,
//   signInWithGooglePopup, 
//   // signInWithGoogleRedirect,
//   createUserDocumentFromAuth
//  } from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import { AuthenticationContainer } from './authentication.styles';

const Authentication = () => {
  // //useEffect will run once on mount
  // //use this method because with redirect to another page, the current 
  // //website doesn't keep track of previously state of the website and it will re-render causing
  // //to lose all state/information send from google based on the user that authenticated

  // useEffect (async () => {
  //   //will ask for get the response after user logged in based on the auth
  //   const response = await getRedirectResult(auth);
  //   if (response) {
  //     const userDocRef = await createUserDocumentFromAuth(response.user)
  //   }
  // })

  // const logGoogleUser = async () => {
  //   const { user } = await signInWithGooglePopup();
  //   const userDocRef = await createUserDocumentFromAuth(user)
  // }

  return (  
    <AuthenticationContainer>
      {/* <button onClick={logGoogleUser}>Sign In with Google Popup</button> */}
      {/* <button onClick={signInWithGoogleRedirect }>Sign In with Google Redirect</button> */}
      <SignInForm />
      <SignUpForm /> 
    </AuthenticationContainer>
  )
}

export default Authentication;