import type { NextPage } from 'next'
import VRMCanvas from 'src/components/vrm/vrmCanvas'
import StartButton from 'src/components/main/startButton'
import StudyCounter from 'src/components/main/studyCounter'
import ChoiceButton from 'src/components/main/choiceButton'
import SquatCounter from 'src/components/main/squatCounter'
import BreakCounter from 'src/components/main/breakCounter'
import Layout from 'src/components/layout/mainLayout'
import { useMediaQuery } from '@mantine/hooks'
import { TransitionContainer } from 'src/components/main/elements/transitionContainer'
import { OverlayWrapper } from 'src/components/main/elements/overlayWrapper'

const Home: NextPage = () => {
  const md = useMediaQuery('(min-width: 992px)')
  const transitionTime = 1.5

  return (
    <Layout>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
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
            <OverlayWrapper top={md ? '50%' : '70%'} left={md ? '70%' : '50%'}>
              <StudyCounter />
            </OverlayWrapper>
          </TransitionContainer>

          <TransitionContainer modeName="choice" time={transitionTime}>
            <OverlayWrapper top="50%" left="70%">
              <ChoiceButton />
            </OverlayWrapper>
          </TransitionContainer>

          <TransitionContainer modeName="fitness" time={transitionTime}>
            <OverlayWrapper top={md ? '50%' : '70%'} left={md ? '70%' : '50%'}>
              <SquatCounter />
            </OverlayWrapper>
          </TransitionContainer>

          <TransitionContainer modeName="break" time={transitionTime}>
            <OverlayWrapper top={md ? '50%' : '70%'} left={md ? '70%' : '50%'}>
              <BreakCounter />
            </OverlayWrapper>
          </TransitionContainer>
        </div>
        <VRMCanvas />
      </div>
    </Layout>
  )
}

export default Home
