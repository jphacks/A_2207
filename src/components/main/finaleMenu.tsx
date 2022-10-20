import { Button, Center, Stack, Title } from '@mantine/core'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'

const FinaleMenu = () => {
  const { setDefaultState } = useSettingsStore(
    (state) => ({
      setMode: state.setMode,
      mode: state.mode,
      setDefaultState: state.setDefaultState,
    }),
    shallow,
  )

  return (
    <Center style={{ width: '100%', height: '100%' }}>
      <Stack sx={() => ({ backgroundColor: 'transparent' })}>
        <Title color="blue" style={{ fontSize: '50px' }}>
          お疲れ様でした
        </Title>
        <Button
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan' }}
          radius="xl"
          size="md"
          onClick={() => setDefaultState()}
        >
          もう一度はじめる
        </Button>
      </Stack>
    </Center>
  )
}

export default FinaleMenu
