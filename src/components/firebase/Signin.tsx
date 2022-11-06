import React from 'react'
import { Avatar, Button, Center, Popover, Stack } from '@mantine/core'
import firebase from 'firebase/compat/app'
import { auth, db } from './firebase'
import { css } from '@emotion/react'
import { formatDate } from 'src/components/analytics/datagraph'

function Signin() {
  const userLoginUpdate = (uid: string) => {
    const docRef = db.collection('log').doc(uid)
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data()
          const log = data?.log as Array<{ date: string; count: number }>
          if (
            !log.some((l) => l.date === formatDate(new Date()) && l.count === 0)
          ) {
            log.push({ date: formatDate(new Date()), count: 0 })
          }
          docRef.update({ log: log })
        } else {
          docRef.set({
            log: [
              {
                date: formatDate(new Date()),
                count: 0,
              },
            ],
          })
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error)
      })
  }

  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        // The signed-in user info.
        const user = result.user
        if (user !== null) {
          const uid = user.uid
          userLoginUpdate(uid)
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  function signInAsTestAccount() {
    const email = process.env.NEXT_PUBLIC_FIREBASE_TEST_ACCOUNT_EMAIL
    const password = process.env.NEXT_PUBLIC_FIREBASE_TEST_ACCOUNT_PASSWORD
    if (email === void 0 || password === void 0) {
      return null
    }
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        if (user !== null) {
          const uid = user.uid
          userLoginUpdate(uid)
        }
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  return (
    <Popover position="right" withArrow shadow="md">
      <Popover.Target>
        <Center pb={10}>
          <Avatar
            css={hover}
            radius="xl"
            // onClick={signInWithGoogle}
            variant="outline"
          />
        </Center>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack>
          <Button
            variant="subtle"
            component="a"
            color="dark"
            onClick={() => signInWithGoogle()}
          >
            Login with Google
          </Button>
          <Button
            variant="subtle"
            color="dark"
            onClick={() => signInAsTestAccount()}
          >
            Login as Test Account
          </Button>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}

const hover = css`
  &:hover {
    cursor: pointer;
  }
`

export default Signin
