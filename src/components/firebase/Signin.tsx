import React from 'react';
import { Button } from '@mantine/core';
import firebase from "firebase/compat/app";
import { auth } from "./firebase"

function Signin() {
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <div>
        <Button onClick={signInWithGoogle}>
            Googleでログインする
        </Button>
    </div>
  )
}

export default Signin