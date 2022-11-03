import {
  Avatar,
  Center,
  Popover,
  Stack,
  Button,
  Modal,
  Title,
  Text,
} from '@mantine/core'
import { auth } from './firebase'
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import UserAnalytics from './userAnalytics'

function Signout() {
  const [analyticsOpened, setAnalyticsOpened] = useState(false)
  const [isTestAccount, setIsTestAccount] = useState(false)

  useEffect(() => {
    setIsTestAccount(
      auth?.currentUser?.email ===
        process.env.NEXT_PUBLIC_FIREBASE_TEST_ACCOUNT_EMAIL,
    )
    console.log()
  }, [auth])

  const Icon = (isTestAccount: boolean) => {
    return auth.currentUser ? (
      <Center pb={10}>
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
      <Center pb={10}>
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
        title={<Title>Analytics</Title>}
      >
        <UserAnalytics />
      </Modal>

      <Popover width={200} position="right" withArrow shadow="md">
        <Popover.Target>{Icon(isTestAccount)}</Popover.Target>
        <Popover.Dropdown>
          <Stack>
            <Button
              variant="subtle"
              component="a"
              color="dark"
              onClick={() => setAnalyticsOpened(true)}
            >
              Analytics
            </Button>
            <Button
              onClick={() => auth.signOut()}
              variant="subtle"
              color="dark"
            >
              Sign Out
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

export default Signout
