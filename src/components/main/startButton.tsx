import {
  Button,
  TextInput,
  Stack,
  SimpleGrid,
  NumberInput,
  Title,
} from '@mantine/core'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'
import { useEffect } from 'react'

const StartButton = () => {
  const {
    setMode,
    setTransitionMode,
    goal,
    setGoal,
    workTime,
    setWorkTime,
    breakTime,
    setBreakTime,
    setCountRemain,
  } = useSettingsStore(
    (state) => ({
      setMode: state.setMode,
      setTransitionMode: state.setTransitionMode,
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
    <div
      style={{
        padding: '1em',
        fontWeight: 'bold',
        background: '#ffffffa0',
        border: 'solid 3px #6091d3',
        borderRadius: '10px',
        position: 'relative',
        minWidth: '300px',
      }}
    >
      <Stack sx={() => ({ backgroundColor: 'transparent' })}>
        <TextInput
          value={goal}
          size="md"
          onChange={(event) => setGoal(event.currentTarget.value)}
          placeholder="目標を入力"
        />

        <SimpleGrid cols={2} spacing="lg">
          <NumberInput
            mt="md"
            label={<Title order={5}>作業時間</Title>}
            // description="From 0 to Infinity, step is 5"
            value={workTime}
            step={5}
            min={1}
            onChange={(val) => {
              setWorkTime(val!)
              setCountRemain(val! * 60)
            }}
          />
          <NumberInput
            mt="md"
            label={<Title order={5}>休憩時間</Title>}
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
          onClick={() => {
            setCountRemain(workTime * 60)
            setTransitionMode('study')
          }}
        >
          START
        </Button>
      </Stack>
    </div>
  )
}

export default StartButton
