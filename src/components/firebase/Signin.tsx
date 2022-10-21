import React from 'react'
import { Avatar, Center } from '@mantine/core'
import firebase from 'firebase/compat/app'
import { auth } from './firebase'
import { css } from '@emotion/react'

function Signin() {
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }
  return (
    <Center py={5}>
      <Avatar
        css={hover}
        radius="xl"
        onClick={signInWithGoogle}
        variant="outline"
      />
    </Center>
  )
}

const hover = css`
  &:hover {
    cursor: pointer;
  }
`

export default Signin
