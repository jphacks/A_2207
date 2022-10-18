import React from 'react'
import { Button } from '@mantine/core';
import firebase from "firebase/compat/app";
import { auth } from "./firebase"

function Signout() {
  return (
    <div>
        <Button onClick={() => auth.signOut()}>
            サインアウト
        </Button>
    </div>
  )
}

export default Signout