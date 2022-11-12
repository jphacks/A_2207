import { useCountdownTimer } from 'use-countdown-timer'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'
import { useEffect } from 'react'
import { useVrmStore } from 'src/stores/vrmStore'
import Counter from './elements/counter'
import ItemBox from './elements/itemBox'

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

  return (
    <ItemBox>
      <Counter
        timerSeconds={timerSeconds}
        countdown={countdown}
        isRunning={isRunning}
        handleClick={handleClick}
      />
    </ItemBox>
  )
}

export default BreakCounter
