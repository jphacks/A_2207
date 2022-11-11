import {
  Center,
  Stack,
  Title,
} from '@mantine/core'
import { useCountdownTimer } from 'use-countdown-timer'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'
import { useEffect, useState } from 'react'
import { db, auth } from 'src/components/firebase/firebase'
import { formatDate } from '../analytics/datagraph'
import { css } from '@emotion/react'
import { IoPause, IoPlay } from 'react-icons/io5'


const StudyCounter = () => {
  let percentage = 0
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

  const timerSeconds = workTime * 60
  const { countdown, start, pause, isRunning } = useCountdownTimer({
    timer: 1000 * (countRemain !== 0 ? countRemain : workTime * 60),
  })

  useEffect(() => {
    start()
    const audio = new Audio('/voices/1.wav')
    setTimeout(() => audio.play(), 500)
    return () => audio.pause()
  }, [])

  const [strokeDashoffset, setStrokeDashoffset] = useState(- length - length * countRemain / (workTime))
  const [deg, setDeg] = useState(360)

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
    percentage = (countdown * 100) / (timerSeconds * 1000)

    const length = Math.PI * 2 * 100;
    const offset = - length - length * percentage / 100
    setStrokeDashoffset(offset)
    setDeg(360 * percentage / 100)
  }, [isRunning, countdown])


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
        <div css={style(strokeDashoffset, deg)} onClick={() => handleClick()}>
          <div className="circle">
            <svg width="300" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(110,110)">
                <circle r="100" className="e-c-base"/>
                <g transform="rotate(-90)">
                  <circle r="100" className="e-c-progress" />
                  <circle cx="100" cy="0" r="8" className="e-c-pointer" />
                </g>
              </g>
            </svg>
          </div>
          <div className="controlls">
            <div className="display-remain-time">
              {new Date(countdown).toISOString().slice(14, 19)}
            </div>
            <div> 
              {isRunning ?
                <IoPause fontSize={60} color="#1C7ED6" />
              :
                <IoPlay fontSize={60} color="#1C7ED6" />
              }
            </div>
          </div>
        </div>
      </Stack>
    </div>
  )
}

const style = (strokeDashoffset: number, deg: number) => css`
  button[data-setter] {
    outline: none;
    background: transparent;
    border: none;
    font-family: 'Roboto';
    font-weight: 300;
    font-size: 18px;
    width: 25px;
    height: 30px;
    color: #1C7ED6;
    cursor: pointer;
  }
  button[data-setter]:hover { opacity: 0.5; }
  .setters {
    position: absolute;
    left: 85px;
    top: 75px;
  }
  .minutes-set {
    float: left;
    margin-right: 28px;
  }
  .seconds-set { float: right; }
  .controlls {
    position: absolute;
    left: 75px;
    top: 105px;
    text-align: center;
  }
  .display-remain-time {
    font-family: 'Roboto';
    font-weight: 100;
    font-size: 65px;
    color: #1C7ED6;
  }
  #pause {
    outline: none;
    background: transparent;
    border: none;
    margin-top: 10px;
    width: 50px;
    height: 50px;
    position: absolute;
  }
  .play::before {
    content: "";
    position: absolute;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 22px solid #1C7ED6;
  }
  .pause::after {
    content: "";
    position: absolute;
    width: 15px;
    height: 30px;
    background-color: transparent;
    border-radius: 1px;
    border: 5px solid #1C7ED6;
    border-top: none;
    border-bottom: none;
  }
  #pause:hover { opacity: 0.8; }
  .e-c-base {
    fill: none;
    stroke: #B6B6B6;
    stroke-width: 4px
  }
  .e-c-progress {
    fill: none;
    stroke: #1C7ED6;
    stroke-width: 4px;
    transition: stroke-dashoffset 0.7s;
    stroke-dasharray: ${Math.PI * 2 * 100};
    stroke-dashoffset: ${strokeDashoffset};
  }
  .e-c-pointer {
    fill: #FFF;
    stroke: #1C7ED6;
    stroke-width: 2px;
    transition: transform 0.7s;
    transform: rotate(${deg}deg);
  }
`

export default StudyCounter
