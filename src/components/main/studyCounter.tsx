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
import { db, auth } from 'src/components/firebase/firebase'
import { formatDate } from '../analytics/datagraph'

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max)
}

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

const StudyCounter = () => {
  const { classes } = useStyles()
  const percentage = useRef(0)
  const [circle, setCircle] = useState(false)
  const { goal, setMode, setStudied, countRemain, setCountRemain, workTime } =
    useSettingsStore(
      (state) => ({
        goal: state.goal,
        setMode: state.setMode,
        setStudied: state.setStudied,
        countRemain: state.countRemain,
        setCountRemain: state.setCountRemain,
        workTime: state.workTime,
      }),
      shallow,
    )
  const { emoteStart } = useVrmStore(
    (state) => ({
      emoteStart: state.emoteStart,
    }),
    shallow,
  )
  const timerSeconds = workTime * 60
  const { countdown, start, pause, isRunning } = useCountdownTimer({
    timer: 1000 * countRemain,
  })

  useEffect(() => {
    start()
    const audio = new Audio('/voices/1.wav')
    audio.play()
  }, [])

  useEffect(() => {
    if (countdown === 0 && isRunning === true) {
      setStudied(true)
      setCountRemain(workTime * 60)
      setMode('choice')
      if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        const docRef = db.collection('log').doc(uid)
        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              const data = doc.data()
              const log = data?.log as Array<{ date: string; count: number }>
              if (!log.some((l) => l.date === formatDate(new Date()))) {
                log.push({ date: formatDate(new Date()), count: workTime })
              } else {
                for (const l of log) {
                  if (l.date === formatDate(new Date())) {
                    l.count += workTime;
                  }
                }
              }
              docRef.update({ log: log })
            } else {
              docRef.set({
                log: [
                  {
                    date: formatDate(new Date()),
                    count: 0,
                  },
                ],
              })
            }
          })
          .catch((error) => {
            console.log('Error getting document:', error)
          })
      }
    }
    setCountRemain(countdown / 1000)
    percentage.current = (countdown * 100) / (timerSeconds * 1000)
  }, [isRunning, countdown])

  const timerClick = () => {
    setCircle(!circle)
    const fileNumbers = [2, 3]
    const audio = new Audio(
      `voices/${fileNumbers[getRandomInt(fileNumbers.length)]}.wav`,
    )
    audio.play()
  }

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
        <Center>
          <Title color="blue">{goal}</Title>
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
        <Center>
          {isRunning ? (
            <Button variant="filled" onClick={pause}>
              一時停止
            </Button>
          ) : (
            <Button variant="outline" onClick={start}>
              再開
            </Button>
          )}
        </Center>
      </Stack>
    </div>
  )
}

export default StudyCounter
