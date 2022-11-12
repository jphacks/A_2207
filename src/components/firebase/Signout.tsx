import {
  Avatar,
  Center,
  Popover,
  Stack,
  Button,
  Modal,
  Title,
} from '@mantine/core'
import { auth } from './firebase'
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import UserAnalytics from './userAnalytics'
import { useMediaQuery } from '@mantine/hooks'

function Signout() {
  const matches = useMediaQuery('(min-width: 576px)')
  const [analyticsOpened, setAnalyticsOpened] = useState(false)
  const [isTestAccount, setIsTestAccount] = useState(false)
  const [username, setUsername] = useState('くま')

  useEffect(() => {
    setIsTestAccount(
      auth?.currentUser?.email ===
        process.env.NEXT_PUBLIC_FIREBASE_TEST_ACCOUNT_EMAIL,
    )
    if (isTestAccount) {
      setUsername('くま')
    } else if (auth?.currentUser?.displayName) {
      setUsername(auth?.currentUser.displayName)
    }
  }, [auth])

  const Icon = (isTestAccount: boolean) => {
    return auth.currentUser ? (
      <Center>
        <Avatar
          css={hover}
          radius="xl"
          variant="outline"
          src={
            isTestAccount
              ? 'https://tegakisozai.com/wp-content/uploads/2020/03/doubutu_kuma.png'
              : auth.currentUser.photoURL
          }
        />
      </Center>
    ) : (
      <Center>
        <Avatar css={hover} radius="xl" variant="outline" color="blue" />
      </Center>
    )
  }

  return (
    <div>
      <Modal
        fullScreen
        centered
        opened={analyticsOpened}
        onClose={() => setAnalyticsOpened(false)}
        title={<Title css={userName}>{username}さんの記録</Title>}
      >
        <UserAnalytics />
      </Modal>

      <Popover
        width={180}
        position={matches ? 'right' : 'bottom-end'}
        withArrow
        shadow="md"
      >
        <Popover.Target>{Icon(isTestAccount)}</Popover.Target>
        <Popover.Dropdown>
          <Stack>
            <Button
              variant="subtle"
              component="a"
              color="dark"
              onClick={() => setAnalyticsOpened(true)}
            >
              記録
            </Button>
            <Button
              onClick={() => auth.signOut()}
              variant="subtle"
              color="dark"
            >
              サインアウト
            </Button>
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </div>
  )
}

const hover = css`
  &:hover {
    cursor: pointer;
  }
`

const userName = css`
  border-bottom: solid 3px #cce4ff;
  position: relative;
  :after {
    position: absolute;
    content: ' ';
    display: block;
    border-bottom: solid 3px #5472cd;
    bottom: -3px;
    width: 20%;
  }
`

export default Signout
