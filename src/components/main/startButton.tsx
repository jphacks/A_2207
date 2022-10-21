import { Button, Center, TextInput, Stack, SimpleGrid, NumberInput } from '@mantine/core'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'
import { useEffect } from 'react'

const StartButton = () => {
  const { setMode, goal, setGoal, workTime, setWorkTime, breakTime, setBreakTime, setCountRemain } = useSettingsStore(
    (state) => ({
      setMode: state.setMode,
      goal: state.goal,
      setGoal: state.setGoal,
      workTime: state.workTime,
      setWorkTime: state.setWorkTime,
      breakTime: state.breakTime,
      setBreakTime: state.setBreakTime,
      setCountRemain: state.setCountRemain,
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
          onChange={(event) => setGoal(event.currentTarget.value)}
          label="目標を入力してください"
          placeholder="頑張る！！"
        />

      <SimpleGrid
        cols={2}
        spacing="lg"
      >
      <NumberInput
        mt="md"
        label="作業時間"
        // description="From 0 to Infinity, step is 5"
        value={workTime}
        step={5}
        min={1}
        onChange={(val) => {setWorkTime(val!); setCountRemain(val!*60);}}
      />
      <NumberInput
        mt="md"
        label="休憩時間"
        // description="From 0 to Infinity, step is 5"
        value={breakTime}
        step={1}
        min={1}
        onChange={(val) => setBreakTime(val!)}
      />
      </SimpleGrid>

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
