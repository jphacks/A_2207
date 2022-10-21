import { Avatar, Center } from '@mantine/core'
import { auth } from './firebase'
import { css } from '@emotion/react'

function Signout() {
  return (
    <Center>
      <Avatar
        css={hover}
        radius="xl"
        variant="outline"
        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
        onClick={() => auth.signOut()}
      />
    </Center>
  )
}

const hover = css`
  &:hover {
    cursor: pointer;
  }
`

export default Signout
