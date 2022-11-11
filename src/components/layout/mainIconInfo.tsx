import {
  ActionIcon,
  Modal,
  Center,
  Text,
  Anchor,
  Stack,
  Title,
} from '@mantine/core'
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
      <Modal centered opened={opened} onClose={() => setOpened(false)}>
        <Stack spacing="xl">
          <Title order={3}>使用音声・3Dモデル</Title>
          <Text>
            Voiced by
            <Link href="https://coefont.cloud/" passHref>
              <Anchor target="_blank"> https://CoeFont.cloud</Anchor>
            </Link>
          </Text>
        </Stack>
      </Modal>
      <Center>
        <ActionIcon variant="transparent">
          <IconInfoCircle onClick={() => setOpened(true)} />
        </ActionIcon>
      </Center>
    </div>
  )
}
