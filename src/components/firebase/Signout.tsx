import { Avatar, Center, Popover, Stack, Button, Modal, Title, Text } from '@mantine/core'
import { auth } from './firebase'
import { css } from '@emotion/react'
import Link from 'next/link'
import { useState } from 'react'
import UserAnalytics from './userAnalytics'

function Signout() {
  const [analyticsOpened, setAnalyticsOpened] = useState(false)
  const Icon = auth.currentUser ? (
    <Center pb={10}>
      <Avatar
        css={hover}
        radius="xl"
        variant="outline"
        src={auth.currentUser.photoURL}
      />
    </Center>
  ) : (
    <Center pb={10}>
      <Avatar css={hover} radius="xl" variant="outline" color="blue" />
    </Center>
  )

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
        <Popover.Target>{Icon}</Popover.Target>
        <Popover.Dropdown>
          <Stack>
            {/* <Link href="/analytics" passHref> */}
              <Button variant="subtle" component="a" color="dark" onClick={() => setAnalyticsOpened(true)}>
                Analytics
              </Button>
            {/* </Link> */}
            <Button onClick={() => auth.signOut()} variant="subtle" color="dark">
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
