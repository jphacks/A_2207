import { useCountdownTimer } from 'use-countdown-timer'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'
import { useEffect } from 'react'
import { useVrmStore } from 'src/stores/vrmStore'
import Counter from './elements/counter'

const BreakCounter = () => {
  const { setTransitionMode, setStudied, breakTime } = useSettingsStore(
    (state) => ({
      setTransitionMode: state.setTransitionMode,
      setStudied: state.setStudied,
      workTime: state.workTime,
      setWorkTime: state.setWorkTime,
      breakTime: state.breakTime,
    }),
    shallow,
  )
  const { emoteStart } = useVrmStore(
    (state) => ({
      emoteStart: state.emoteStart,
    }),
    shallow,
  )
  const timerSeconds = breakTime * 60

  const { countdown, start, pause, isRunning } = useCountdownTimer({
    timer: 1000 * timerSeconds,
  })

  useEffect(() => {
    start()
    const audio = new Audio('/voices/15.wav')
    emoteStart('FemaleSittingPose')
    setTimeout(() => {
      audio.play()
    }, 500)
  }, [])

  useEffect(() => {
    if (countdown === 0 && isRunning === true) {
      setStudied(true)
      setTransitionMode('initial')
    }
  }, [isRunning, countdown])

  const handleClick = () => {
    if (isRunning) {
      pause()
    } else {
      start()
    }
  }

  useEffect(() => {
    const id = setInterval(() => {
      const n = Math.random()
      // if (n < 0.9) {
      //   emoteStart('ArmStretching')
      // } else if (n < 0.95) {
      //   emoteStart('Thinking')
      // } else {
      //   emoteStart('Bored')
      // }
    }, 5000)
    return () => clearInterval(id)
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
      <Counter
        timerSeconds={timerSeconds}
        countdown={countdown}
        isRunning={isRunning}
        handleClick={handleClick}
      />
    </div>
  )
}

export default BreakCounter
