import "./sign-in-form.styles.scss"
import FormInput from './../form-input/form-input.component';
import {useState} from 'react';
import Button from './../button/button.component';
import {createUserDocumentFromAuth, signInUserWithEmailAndPassoword} from "../../utils/firebase/firebase.utils";
import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  email: "",
  password: ""
}

const SignInForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields)
  const {email, password} = formFields;

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormFields({
      ...formFields,
      [name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredentials = await signInUserWithEmailAndPassoword(email, password);
      console.log(userCredentials.user)

    } catch (error) {
      console.log("Could not log in user with email and password");
      console.log(error);
    }

  }

  const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }

  return (
    <div className="">
      <h2>I already have an account</h2>
      <span>Sign in with your email and poassword</span>

      <form onSubmit={handleSubmit}>

        <FormInput label="Email" type="email"
          value={email}
          name="email"
          onChange={handleChange}/>
        <FormInput label="Password" type="password"
          value={password}
          name="password"
          onChange={handleChange}/>

        <div className="sign-in-buttons">
          <Button type="submit">
            SIGN IN
          </Button>

          <Button type="button"
            buttonType={"google"}
            onClick = {signInWithGoogle}>
            SIGN IN WITH GOOGLE
          </Button>
        </div>

      </form>
    </div>
  )
}

export default SignInForm;
