import {
  Button,
  Center,
  Stack,
  Title,
  Text,
  Group,
  Progress,
  Card,
  createStyles,
  RingProgress,
} from '@mantine/core'
import { useCountdownTimer } from 'use-countdown-timer'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'
import { useEffect, useRef, useState } from 'react'
import { useVrmStore } from 'src/stores/vrmStore'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.fn.primaryColor(),
    width: '100%',
  },

  title: {
    color: theme.fn.rgba(theme.white, 0.65),
  },

  stats: {
    color: theme.white,
  },

  progressBar: {
    backgroundColor: theme.white,
  },

  progressTrack: {
    backgroundColor: theme.fn.rgba(theme.white, 0.4),
  },
}))

const BreakCounter = () => {
  const { classes } = useStyles()
  const percentage = useRef(0)
  const [circle, setCircle] = useState(false)
  const { setMode, setStudied, setCountRemain, breakTime } = useSettingsStore(
    (state) => ({
      setMode: state.setMode,
      setStudied: state.setStudied,
      setCountRemain: state.setCountRemain,
      workTime: state.workTime,
      setWorkTime: state.setWorkTime,
      breakTime: state.breakTime,
      setBreakTime: state.setBreakTime,
    }),
    shallow,
  )
  const { setAnimation } = useVrmStore(
    (state) => ({
      setAnimation: state.setAnimation,
    }),
    shallow,
  )
  const timerSeconds = breakTime * 60
  const { countdown, start, isRunning } = useCountdownTimer({
    timer: 1000 * timerSeconds,
  })

  useEffect(() => {
    start()
    const audio = new Audio('/voices/15.wav')
    audio.play()
  }, [])

  useEffect(() => {
    if (countdown === 0 && isRunning === true) {
      setStudied(true)
      setMode('initial')
    }
    setCountRemain(countdown / 1000)
    percentage.current = (countdown * 100) / (timerSeconds * 1000)
  }, [isRunning, countdown])

  const timerClick = () => {
    setCircle(!circle)
  }

  const animationList = ['ArmStretching', 'Thinking']
  useEffect(() => {
    const id = setInterval(() => {
      // setAnimation(
      //   animationList[Math.floor(Math.random() * animationList.length)],
      // )
    }, 10000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      style={{
        padding: '1em',
        fontWeight: 'bold',
        background: '#FFF',
        border: 'solid 3px #6091d3',
        borderRadius: '10px',
        position: 'relative',
      }}
    >
      <Stack sx={() => ({ backgroundColor: 'transparent' })}>
        <Center>
          <Title color="blue" style={{ fontSize: '50px' }}>
            休憩中
          </Title>
        </Center>
        <Center onClick={() => timerClick()}>
          {circle ? (
            <Card withBorder radius="md" p="xl" className={classes.card}>
              <Text size="xs" weight={700} className={classes.title}>
                REMAINING
              </Text>
              <Title weight={500} className={classes.stats}>
                {new Date(countdown).toISOString().slice(14, 19)}
              </Title>

              <Progress
                value={percentage.current}
                mt="md"
                size="lg"
                radius="xl"
                classNames={{
                  root: classes.progressTrack,
                  bar: classes.progressBar,
                }}
              />
              <Group position="left">
                <Text size="xs" color="white">
                  あと {Math.trunc(percentage.current)}%
                </Text>
              </Group>
            </Card>
          ) : (
            <RingProgress
              label={
                <div>
                  <Text size="xs" weight={700} align="center">
                    REMAINING
                  </Text>
                  <Title weight={500} align="center">
                    {new Date(countdown).toISOString().slice(14, 19)}
                  </Title>
                  <Text size="xs" color="gray" align="center">
                    あと {Math.trunc(percentage.current)}%
                  </Text>
                </div>
              }
              size={240}
              thickness={16}
              roundCaps
              sections={[{ value: percentage.current, color: 'blue' }]}
            />
          )}
        </Center>
        <Stack align="center">
          <Button variant="default" onClick={() => setMode('initial')}>
            休憩を終了する
          </Button>
        </Stack>
      </Stack>
    </div>
  )
}

export default BreakCounter
