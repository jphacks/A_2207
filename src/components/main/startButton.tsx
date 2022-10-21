import { Button, Center, TextInput, Stack } from '@mantine/core'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'
import { useEffect } from 'react'

const StartButton = () => {
  const { setMode, goal, setGoal } = useSettingsStore(
    (state) => ({
      setMode: state.setMode,
      goal: state.goal,
      setGoal: state.setGoal,
    }),
    shallow,
  )

  useEffect(() => {
    setGoal('')
  }, [])
  return (
    <Center style={{ width: '100%', height: '100%' }}>
      <Stack sx={() => ({ backgroundColor: 'transparent', height: 300 })}>
        <TextInput
          value={goal}
          size="md"
          onChange={(event) => setGoal(event.currentTarget.value)}
          placeholder="ゴールを入力"
        />
        <Button
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan' }}
          radius="xl"
          size="xl"
          onClick={() => setMode('study')}
        >
          START
        </Button>
      </Stack>
    </Center>
  )
}

export default StartButton
