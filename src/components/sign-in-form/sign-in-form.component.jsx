import { useState } from 'react';
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-in-form.styles.scss';

const defaultFormFiels = {
  email: '',
  password: '',
}

const SignInForm = () => {

  const [formFiels, setFormFiels] = useState(defaultFormFiels)
  const { email, password } = formFiels;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try { 
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields()
    } catch (error) {
      switch(error.code) {
        case 'auth/wrong-password': 
          alert('Incorrect password for email!');
          break 
        case 'auth/user-not-found':
          alert('No user associated with this email')
          break
        default: console.log('error', error.code)
      } 
    }
  }  

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFiels({ ...formFiels, [name]: value });
  }

  const resetFormFields = () => {
    setFormFiels(defaultFormFiels);
  } 

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user)
  }

  return (
    <div className='sign-up-container'>
      <h2>Already have an account? </h2>
      <span> Sign In with your Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
          required />
        <FormInput
          label='Password'
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
          required />
        <div className='butttons-container'>
          <Button type="submit">SIGN IN</Button>
          <Button buttonType='google' type='button' onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</Button>
        </div>
      </form> 
    </div>
  ) 
}
export default SignInForm;
