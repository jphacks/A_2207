import { ActionIcon, Modal, Center } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons'
import { Dispatch, SetStateAction } from 'react'

interface IconInfoProps {
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
}

export function IconInfo({ opened, setOpened }: IconInfoProps) {
  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="ここに説明文を書く"
      >
        {/* Modal content */}
      </Modal>
      <Center>
        <ActionIcon variant="transparent">
          <IconInfoCircle onClick={() => setOpened(true)} />
        </ActionIcon>
      </Center>
    </div>
  )
}
