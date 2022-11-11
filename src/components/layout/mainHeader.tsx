import { IconConfig } from './mainIconConfig'
import Signin from '../firebase/Signin'
import SignOut from '../firebase/Signout'
import { auth } from '../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useState } from 'react'
import { Header, Title, Flex } from '@mantine/core'
import Link from 'next/link'

export function MainHeader() {
  const [configOpened, setConfigOpened] = useState(false)
  const [user] = useAuthState(auth as any)

  return (
    <Header height={60} px="md">
      <Flex justify="space-between" align="center" mih={60}>
        <IconConfig opened={configOpened} setOpened={setConfigOpened} />
        <Link href="/landingPage" passHref>
          <Title
            variant="gradient"
            order={2}
            gradient={{ from: 'blue', to: 'cyan' }}
          >
            VRooM
          </Title>
        </Link>

        <div style={{ transform: 'translate(-40px)' }}>
          {user ? <SignOut /> : <Signin />}
        </div>
      </Flex>
    </Header>
  )
}
