import { Button, Center, Stack, Title, Text, Grid, Group, Progress, Card, RingProgress } from '@mantine/core'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'
import { useEffect, useRef, useState } from 'react'


const GoalViewer = () => {
  const { goal } = useSettingsStore(
    (state) => ({
      goal: state.goal,
    }),
    shallow,
  )

  return (
    <div>
        <Text color="gray" size="xs">この時間の目標：</Text>
        <Title color="blue">{goal}</Title>
    </div>
  );
}

export default GoalViewer
