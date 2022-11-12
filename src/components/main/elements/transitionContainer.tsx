import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'
import WiperTransition from 'src/components/main/elements/wiperTransition'
import { useEffect } from 'react'
import { useVrmStore } from 'src/stores/vrmStore'

export const TransitionContainer = ({
  children,
  modeName,
  time,
}: {
  children: React.ReactNode
  modeName: string
  time: number
}) => {
  const { mode, transitionMode, setMode } = useSettingsStore(
    (state) => ({
      mode: state.mode,
      transitionMode: state.transitionMode,
      setMode: state.setMode,
    }),
    shallow,
  )
  const { emoteFinish } = useVrmStore(
    (state) => ({
      emoteFinish: state.emoteFinish,
    }),
    shallow,
  )
  useEffect(() => {
    if (transitionMode === modeName) {
      const timeoutId = setTimeout(() => {
        emoteFinish()
        setMode(transitionMode)
      }, (1000 * time) / 2)
      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [transitionMode, modeName])
  return (
    <>
      {(transitionMode === modeName || mode === modeName) &&
        transitionMode !== 'first' && <WiperTransition time={time} />}
      {mode === modeName && children}
    </>
  )
}
