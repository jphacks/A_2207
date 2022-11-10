import { IconConfig } from './mainIconConfig'
import { useSettingsStore } from 'src/stores/settingsStore'
import shallow from 'zustand/shallow'
import Signin from '../firebase/Signin'
import SignOut from '../firebase/Signout'
import { auth } from '../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useState } from 'react'
import { Group, Header, Title } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { OverlayWrapper } from 'src/pages'
import Link from 'next/link'

export function MainHeader() {
  const [configOpened, setConfigOpened] = useState(false)
  const [user] = useAuthState(auth as any)

  return (
      <Header height={60} p="xs">
        <Group position='apart'>
          <IconConfig opened={configOpened} setOpened={setConfigOpened}/>

          <Link href="/landingPage" passHref>
            <Title
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
            >
              VRooM
            </Title>
          </Link>

          <div>
            {user ? <SignOut /> : <Signin />}
          </div>
        </Group>
      </Header>
  )
}
