import { useState, FormEvent, ChangeEvent } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { SignUpContainer } from "./sign-up-form.styles";

const defaultFormFiels = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFiels, setFormFiels] = useState(defaultFormFiels);
  const { displayName, email, password, confirmPassword } = formFiels;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Password did not match!");
      return;
    }

    try {
      const user = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user!.user, { displayName });
      resetFormFields();
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert("Cannot create user, email already in use!");
      }
      console.log("user creation encountered an error", error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFiels({ ...formFiels, [name]: value });
  };

  const resetFormFields = () => {
    setFormFiels(defaultFormFiels);
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span> Sign Up with your Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          name="displayName"
          onChange={handleChange}
          value={displayName}
          required
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
          required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
          required
        />
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
          required
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};
export default SignUpForm;
