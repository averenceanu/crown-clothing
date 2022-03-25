import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

const defaultFormFiels = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {

  const [formFiels, setFormFiels] = useState(defaultFormFiels)
  const { displayName, email, password, confirmPassword } = formFiels;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Password did not match!")
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)
      await createUserDocumentFromAuth(user, { displayName })
      resetFormFields()
    } catch (error) {
      if(error.code === 'auth/email-already-in-use'){
        alert('Cannot create user, email already in use!')
      }
      console.log('user creation encountered an error', error.message)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFiels({ ...formFiels, [name]: value });
  }

  const resetFormFields = () => {
    setFormFiels(defaultFormFiels);
  }

  return (
    <div>
      <h1> Sign Up with your Email and Password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input
          type="text"
          name="displayName"
          onChange={handleChange}
          value={displayName}
          required />

        <label>Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
          required />

        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
          required />

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
          required />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}
export default SignUpForm;
