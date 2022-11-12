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
  const sm = useMediaQuery('(min-width: 576px)')
  const transitionTime = 1.5

  return (
    <Layout>
      <TransitionContainer modeName="initial" time={transitionTime}>
        <OverlayWrapper
          bottom={md ? '15%' : sm ? '80px' : '140px'}
          right={md ? '5%' : undefined}
        >
          <StartButton />
        </OverlayWrapper>
      </TransitionContainer>

      <TransitionContainer modeName="study" time={transitionTime}>
        <OverlayWrapper
          top={md ? '30%' : undefined}
          bottom={md ? undefined : sm ? '80px' : '140px'}
          right={sm ? '10%' : undefined}
        >
          <StudyCounter />
        </OverlayWrapper>
      </TransitionContainer>

      <TransitionContainer modeName="choice" time={transitionTime}>
        <OverlayWrapper
          top={md ? '30%' : undefined}
          bottom={md ? undefined : sm ? '80px' : '140px'}
          right={md ? '10%' : undefined}
        >
          <ChoiceButton />
        </OverlayWrapper>
      </TransitionContainer>

      <TransitionContainer modeName="fitness" time={transitionTime}>
        <OverlayWrapper
          top={md ? '30%' : undefined}
          bottom={md ? undefined : sm ? '80px' : '140px'}
          right={md ? '10%' : undefined}
        >
          <SquatCounter />
        </OverlayWrapper>
      </TransitionContainer>

      <TransitionContainer modeName="break" time={transitionTime}>
        <OverlayWrapper
          top={md ? '30%' : undefined}
          bottom={md ? undefined : sm ? '80px' : '140px'}
          right={sm ? '10%' : undefined}
        >
          <BreakCounter />
        </OverlayWrapper>
      </TransitionContainer>
      <VRMCanvas />
    </Layout>
  )
}

export default Home
