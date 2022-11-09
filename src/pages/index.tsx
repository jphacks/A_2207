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
const Home: NextPage = () => {
  const { mode } = useSettingsStore(
    (state) => ({
      mode: state.mode,
    }),
    shallow,
  )
  const md = useMediaQuery('(min-width: 1000px)')

  return (
    <Layout>
      <div className="container">
        {mode === 'initial' && (
          <OverlayWrapper
            top={md ? '70%' : '70%'}
            right={md ? '-5%' : undefined}
            left={md ? undefined : '50%'}
          >
            <StartButton />
          </OverlayWrapper>
        )}
        {mode === 'study' && (
          <>
            <div style={{position: 'absolute', zIndex: 11}}>
              <WiperTransition />
            </div>
            <OverlayWrapper top={md ? '50%' : '73%'} left={md ? '70%' : '50%'}>
              <StudyCounter />
            </OverlayWrapper>
          </>
        )}
        {mode === 'choice' && (
          <OverlayWrapper top="50%" left="70%">
            <ChoiceButton />
          </OverlayWrapper>
        )}
        {mode === 'fitness' && (
          <OverlayWrapper top={md ? '50%' : '75%'} left={md ? '70%' : '50%'}>
            <SquatCounter />
          </OverlayWrapper>
        )}
        {mode === 'break' && (
          <OverlayWrapper top={md ? '50%' : '70%'} left={md ? '70%' : '50%'}>
            <BreakCounter />
          </OverlayWrapper>
        )}
        <VRMCanvas />
      </div>
    </Layout>
  )
}

export default Home
