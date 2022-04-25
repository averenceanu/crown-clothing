import { useState, FormEvent, ChangeEvent } from "react";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { SignUpContainer, ButttonsContainer } from "./sign-in-form.styles";

const defaultFormFiels = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFiels, setFormFiels] = useState(defaultFormFiels);
  const { email, password } = formFiels;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error) {
        case "auth/wrong-password":
          alert("Incorrect password for email!");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email");
          break;
        default:
          console.log("error", error);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFiels({ ...formFiels, [name]: value });
  };

  const resetFormFields = () => {
    setFormFiels(defaultFormFiels);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  return (
    <SignUpContainer>
      <h2>Already have an account? </h2>
      <span> Sign In with your Email and Password</span>
      <form onSubmit={handleSubmit}>
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
        <ButttonsContainer>
          <Button type="submit">SIGN IN</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type="button"
            onClick={signInWithGoogle}
          >
            SIGN IN WITH GOOGLE
          </Button>
        </ButttonsContainer>
      </form>
    </SignUpContainer>
  );
};
export default SignInForm;
