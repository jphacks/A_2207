import { ActionIcon, Modal, Center, Button, Title } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'

interface IconInfoProps {
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
}

export function IconInfo({ opened, setOpened }: IconInfoProps) {
  return (
    <div>
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title={<Title>Info</Title>}
      >
        <Link href="/landingPage" passHref>
          <Button component="a">Landing Page</Button>
        </Link>
      </Modal>
      <Center>
        <ActionIcon variant="transparent">
          <IconInfoCircle onClick={() => setOpened(true)} />
        </ActionIcon>
      </Center>
    </div>
  )
}
