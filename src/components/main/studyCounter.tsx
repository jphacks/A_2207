import { Button, Center, Stack, Title, Text, Grid, Group, Progress, Card, createStyles, RingProgress } from '@mantine/core'
import { useCountdownTimer } from 'use-countdown-timer'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'
import { useEffect, useRef, useState } from 'react'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.fn.primaryColor(),
    width: '100%'
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
}));

const StudyCounter = () => {
  const { classes } = useStyles();
  const percentage = useRef(0);
  const [circle, setCircle] = useState(false);
  const { setMode, setPositionX, setPositionY, setPositionZ, setStudied, countRemain, setCountRemain } = useSettingsStore(
    (state) => ({
      setMode: state.setMode,
      setPositionX: state.setPositionX,
      setPositionY: state.setPositionY,
      setPositionZ: state.setPositionZ,
      setStudied: state.setStudied,
      countRemain: state.countRemain,
      setCountRemain: state.setCountRemain,
    }),
    shallow,
  )
  const timerSeconds = 60 // ユーザーが設定した値（変更可にする）
  const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
    timer: 1000 * countRemain,
  });

  useEffect(() => {
    start()
  }, [])

  useEffect(() => {
    if (countdown===0 && isRunning === true) {
      setPositionX(0)
      setPositionY(-0.8)
      setPositionZ(0)
      setStudied(true)
      setMode('fitness')
    }
    setCountRemain(countdown/1000)
    percentage.current = countdown * 100 / (timerSeconds * 1000)
  }, [isRunning, countdown])

  return (
    <div>
      <Stack sx={() => ({ backgroundColor: 'transparent' })}>
        <Center onClick={() => setCircle(!circle)}>
          {circle ?     
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
              sections={[
                { value: percentage.current, color: 'blue' },
              ]}
            />
            :
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
                  bar: classes.progressBar
                }}
              />
              <Group position="left">
                <Text size="xs" color="white">
                  あと {Math.trunc(percentage.current)}%
                </Text>
              </Group>
            </Card>
          }
          {/* <Title>{new Date(countdown).toISOString().slice(14, 19)}</Title> */}
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
