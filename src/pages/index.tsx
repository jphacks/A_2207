import type { NextPage } from 'next'
import VRMCanvas from 'src/components/vrm/vrmCanvas'
import StartButton from 'src/components/main/startButton'
import StudyCounter from 'src/components/main/studyCounter'
import ChoiceButton from 'src/components/main/choiceButton'
import SquatCounter from 'src/components/main/squatCounter'
import BreakCounter from 'src/components/main/breakCounter'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'
import Layout from 'src/components/layout/mainLayout'
import { Property } from 'csstype'
import { useMediaQuery } from '@mantine/hooks'
import WiperTransition from 'src/components/transition/wiperTransition'
import { useEffect } from 'react'

export const OverlayWrapper = ({
  children,
  top,
  left,
  right,
  bottom,
}: {
  children: React.ReactNode
  top?: Property.Top<string | number> | undefined
  left?: Property.Left<string | number> | undefined
  right?: Property.Right<string | number> | undefined
  bottom?: Property.Bottom<string | number> | undefined
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 10,
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {children}
    </div>
  )
}

const TransitionContainer = ({
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
  useEffect(() => {
    if (transitionMode === modeName) {
      const timeoutId = setTimeout(() => {
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

const Home: NextPage = () => {
  const md = useMediaQuery('(min-width: 992px)')
  const transitionTime = 1.5

  return (
    <Layout>
      <div className="container">
        <TransitionContainer modeName="initial" time={transitionTime}>
          <OverlayWrapper
            top={md ? '70%' : '70%'}
            right={md ? '-5%' : undefined}
            left={md ? undefined : '50%'}
          >
            <StartButton />
          </OverlayWrapper>
        </TransitionContainer>

        <TransitionContainer modeName="study" time={transitionTime}>
          <OverlayWrapper top={md ? '50%' : '73%'} left={md ? '70%' : '50%'}>
            <StudyCounter />
          </OverlayWrapper>
        </TransitionContainer>

        <TransitionContainer modeName="choice" time={transitionTime}>
          <OverlayWrapper top="50%" left="70%">
            <ChoiceButton />
          </OverlayWrapper>
        </TransitionContainer>

        <TransitionContainer modeName="fitness" time={transitionTime}>
          <OverlayWrapper top={md ? '50%' : '75%'} left={md ? '70%' : '50%'}>
            <SquatCounter />
          </OverlayWrapper>
        </TransitionContainer>

        <TransitionContainer modeName="break" time={transitionTime}>
          <OverlayWrapper top={md ? '50%' : '70%'} left={md ? '70%' : '50%'}>
            <BreakCounter />
          </OverlayWrapper>
        </TransitionContainer>

        <VRMCanvas />
      </div>
    </Layout>
  )
}

export default Home
