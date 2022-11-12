import { Button, Center, Stack, Text } from '@mantine/core'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'
import { useEffect } from 'react'

const ChoiceButton = () => {
  const { setTransitionMode } = useSettingsStore(
    (state) => ({
      setTransitionMode: state.setTransitionMode,
      goal: state.goal,
      setGoal: state.setGoal,
    }),
    shallow,
  )

  useEffect(() => {
    const audio = new Audio('/voices/11.wav')
    audio.play()
  }, [])

  return (
    <Center style={{ width: '100%', height: '100%' }}>
      <Stack sx={() => ({ backgroundColor: 'transparent', height: 300 })}>
        <Button
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan' }}
          radius="xl"
          size="xl"
          onClick={() => setTransitionMode('fitness')}
        >
          スクワットモード
        </Button>
        <Button
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan' }}
          radius="xl"
          size="xl"
          // disabled
        >
          <Stack spacing={0}>
            <Text color="gray.5">深呼吸モード</Text>
            <Text size="xs" color="gray.4">
              Comming Soon
            </Text>
          </Stack>
        </Button>
        <Button
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan' }}
          radius="xl"
          size="xl"
          onClick={() => setTransitionMode('initial')}
        >
          終了する
        </Button>
      </Stack>
    </Center>
  )
}

export default ChoiceButton
