import { Flex, Text } from '@mantine/core'
import { useCountdownTimer } from 'use-countdown-timer'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'
import { useEffect } from 'react'
import { db, auth } from 'src/components/firebase/firebase'
import { formatDate } from '../analytics/datagraph'
import Counter from './elements/counter'
import ItemBox from './elements/itemBox'
import { useMediaQuery } from '@mantine/hooks'

const StudyCounter = () => {
  const {
    goal,
    setTransitionMode,
    setStudied,
    countRemain,
    setCountRemain,
    workTime,
  } = useSettingsStore(
    (state) => ({
      goal: state.goal,
      setTransitionMode: state.setTransitionMode,
      setStudied: state.setStudied,
      countRemain: state.countRemain,
      setCountRemain: state.setCountRemain,
      workTime: state.workTime,
    }),
    shallow,
  )

  const sm = useMediaQuery('(min-width: 576px)')

  const timerSeconds = workTime * 60
  const { countdown, start, pause, isRunning } = useCountdownTimer({
    timer: 1000 * (countRemain !== 0 ? 40 : workTime * 60),
  })

  useEffect(() => {
    start()
    const audio = new Audio('/voices/1.wav')
    setTimeout(() => audio.play(), 500)
    return () => audio.pause()
  }, [])

  const handleClick = () => {
    if (isRunning) {
      pause()
    } else {
      start()
    }
  }

  useEffect(() => {
    if (countdown === 0 && isRunning === true) {
      setStudied(true)
      setCountRemain(workTime * 60)
      setTransitionMode('choice')
      if (auth.currentUser) {
        const uid = auth.currentUser.uid
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
                    l.count += workTime
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
  }, [isRunning, countdown])

  return (
    <ItemBox>
      <Flex
        gap="md"
        justify="center"
        align="center"
        direction={sm ? 'column' : 'row'}
        style={{ maxWidth: sm ? '500px' : '95vw' }}
      >
        {goal && (
          <Text color="#1c7ed6" style={{ fontSize: 28 }}>
            {goal}
          </Text>
        )}
        <Counter
          timerSeconds={timerSeconds}
          countdown={countdown}
          isRunning={isRunning}
          handleClick={handleClick}
        />
      </Flex>
    </ItemBox>
  )
}

export default StudyCounter
