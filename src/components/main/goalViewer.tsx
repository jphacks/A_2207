import { Title, Text } from '@mantine/core'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'

const GoalViewer = () => {
  const { goal } = useSettingsStore(
    (state) => ({
      goal: state.goal,
    }),
    shallow,
  )

  return (
    <div>
      <Text color="gray" size="xs">
        この時間の目標：
      </Text>
      <Title color="blue">{goal}</Title>
    </div>
  )
}

export default GoalViewer
