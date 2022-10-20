import React from 'react'
import { Button } from '@mantine/core'
import { auth } from './firebase'

function Signout() {
  return (
    <div>
      <Button onClick={() => auth.signOut()}>サインアウト</Button>
    </div>
  )
}

export default Signout
