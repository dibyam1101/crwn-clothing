import React from "react-dom";
import {useEffect} from "react";
import {signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect, auth} from "../../utils/firebase/firebase.utils";
import {getRedirectResult} from 'firebase/auth'
import SignUpForm from "../../components/sign-up-form/sign-up-form.component"

const SignIn = () => {


  useEffect(() => {
    async function logAuthResponse() {
      const response = await getRedirectResult(auth);
      response && await createUserDocumentFromAuth(response.user);
    }
    logAuthResponse();
  }, []);

  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocReference = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign In With Google</button>
      <button onClick={signInWithGoogleRedirect}>Sign In With Google</button>
      <SignUpForm/>
    </div>
  );
};

export default SignIn;
