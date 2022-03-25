import { useState } from 'react';

const defaultFormFiels = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFiels, setFormFiels] = useState(defaultFormFiels)
  const {displayName, email, password, confirmPassword} = formFiels;

  console.log(formFiels)
  const handleChange = (event) => {
    const {name, value} = event.target
    setFormFiels({...formFiels, [name]: value});
  }
 
  return (
    <div>
      <h1> Sign Up with your Email and Password</h1>
      <form onSubmit={() => {}}>
        <label>Display Name</label>
        <input 
          type="text" 
          name="displayName" 
          onChange={handleChange} 
          value={displayName}
          required/>

        <label>Email</label>
        <input 
          type="email" 
          name="email" 
          onChange={handleChange} 
          value={email}
          required/>

        <label>Password</label>
        <input 
          type="password" 
          name="password" 
          onChange={handleChange} 
          value={password}
          required/>

        <label>Confirm Password</label>
        <input 
          type="password" 
          name="confirmPassword" 
          onChange={handleChange} 
          value={confirmPassword}
          required/>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}
export default SignUpForm;
