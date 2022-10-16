import { ActionIcon, Modal, Center, Button } from '@mantine/core'
import { IconInfoCircle, IconBrandTwitter } from '@tabler/icons'
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
        title="ここに説明文を書く"
      >
        <Button
          component="a"
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/mantinedev"
          leftIcon={<IconBrandTwitter size={18} />}
          styles={(theme) => ({
            root: {
              backgroundColor: '#00acee',
              border: 0,
              height: 42,
              paddingLeft: 20,
              paddingRight: 20,

              '&:hover': {
                backgroundColor: theme.fn.darken('#00acee', 0.05),
              },
            },

            leftIcon: {
              marginRight: 15,
            },
          })}
        >
          Follow on Twitter
        </Button>
      </Modal>
      <Center>
        <ActionIcon variant="transparent">
          <IconInfoCircle onClick={() => setOpened(true)} />
        </ActionIcon>
      </Center>
    </div>
  )
}
