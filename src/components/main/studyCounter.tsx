import { Button, Center, Stack, Title, Grid } from '@mantine/core'
import { useCountdownTimer } from 'use-countdown-timer'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'
import { useEffect } from 'react'

const StudyCounter = () => {
  const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
    timer: 1000 * 3,
  });
  const { setMode, setPositionX, setPositionY, setPositionZ } = useSettingsStore(
    (state) => ({
      setMode: state.setMode,
      setPositionX: state.setPositionX,
      setPositionY: state.setPositionY,
      setPositionZ: state.setPositionZ,
    }),
    shallow,
  )

  useEffect(() => {
    start()
  }, [])

  useEffect(() => {
    if (countdown===0 && isRunning === true) {
      setPositionX(0)
      setPositionY(-0.8)
      setPositionZ(0)
      setMode('fitness')
    }
  }, [isRunning, countdown])

  return (
    <div>
      <Stack sx={() => ({ backgroundColor: 'transparent' })}>
        <Center>
          <Title>{new Date(countdown).toISOString().slice(14, 19)}</Title>
        </Center>
        <Grid>
          <Grid.Col span={6}>
            <Center>
              <Button variant="default" onClick={reset}>リセット</Button>
            </Center>
          </Grid.Col>
          <Grid.Col span={6}>
            <Center>
              {isRunning ? (
                <Button variant="filled" onClick={pause}>一時停止</Button>
              ) : (
                <Button variant="outline" onClick={start}>再開</Button>
              )}
            </Center>
          </Grid.Col>
        </Grid>
      </Stack>
    </div>
  );
}

export default StudyCounter
