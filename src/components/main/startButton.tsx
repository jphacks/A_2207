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
import ItemBox from './elements/itemBox'
import { useVrmStore } from 'src/stores/vrmStore'

const StartButton = () => {
  const {
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
  const { emoteStart } = useVrmStore(
    (state) => ({
      emoteStart: state.emoteStart,
    }),
    shallow,
  )

  useEffect(() => {
    setGoal('')
    emoteStart('StandingGreeting')
  }, [])
  return (
    <ItemBox>
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
            label={
              <Title color="#1c7ed6" order={4}>
                作業時間
              </Title>
            }
            // description="From 0 to Infinity, step is 5"
            value={workTime}
            step={5}
            min={1}
            onChange={(val) => {
              setWorkTime(val || 0)
              setCountRemain((val || 0) * 60)
            }}
          />
          <NumberInput
            mt="md"
            label={
              <Title order={4} color="#1c7ed6">
                休憩時間
              </Title>
            }
            // description="From 0 to Infinity, step is 5"
            value={breakTime}
            step={1}
            min={1}
            onChange={(val) => setBreakTime(val || 0)}
          />
        </SimpleGrid>

        <Button
          variant="outline"
          radius="xl"
          size="xl"
          onClick={() => {
            setCountRemain(workTime * 60)
            setTransitionMode('study')
          }}
          style={{ fontSize: 24, border: '2px solid' }}
        >
          START
        </Button>
      </Stack>
    </ItemBox>
  )
}

export default StartButton
