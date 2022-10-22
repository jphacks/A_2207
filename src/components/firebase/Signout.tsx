import { Avatar, Center, Popover, Stack, Button } from '@mantine/core'
import { auth } from './firebase'
import { css } from '@emotion/react'
import Link from 'next/link'

function Signout() {
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
    <Popover width={200} position="right" withArrow shadow="md">
      <Popover.Target>{Icon}</Popover.Target>
      <Popover.Dropdown>
        <Stack>
          <Link href="/analytics" passHref>
            <Button variant="subtle" component="a" color="dark" disabled>
              Analytics
            </Button>
          </Link>
          <Button onClick={() => auth.signOut()} variant="subtle" color="dark">
            Sign Out
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

export default Signout
