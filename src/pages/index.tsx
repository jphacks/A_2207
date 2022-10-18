import type { NextPage } from 'next'
import VRMCanvas from 'src/components/charaVisualize/vrmCanvas'
import StartButton from 'src/components/main/startButton'
import StudyCounter from 'src/components/main/studyCounter'
import SquatCounter from 'src/components/main/squatCounter'
import FinaleMenu from 'src/components/main/finaleMenu'
import GoalView from 'src/components/main/goalViewer'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'
import Layout from 'src/components/layout/mainLayout'
import GoalViewer from 'src/components/main/goalViewer'

const Home: NextPage = () => {
  const { mode, studied } = useSettingsStore(
    (state) => ({
      mode: state.mode,
      studied: state.studied,
    }),
    shallow,
  )
  return (
    <Layout>
      <div className="container">
        {mode === 'initial' && (
          <div
            style={{
              position: 'absolute',
              zIndex: 10,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <StartButton />
          </div>
        )}
        {mode === 'study' && (
          <div
            style={{
              position: 'absolute',
              zIndex: 10,
              top: '50%',
              left: '70%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <StudyCounter />
          </div>
        )}
        {mode === 'study' && (
          <div
            style={{
              position: 'absolute',
              zIndex: 10,
              top: '5%',
              right: '5%',
            }}
          >
            <GoalViewer />
          </div>
        )}
        {mode === 'fitness' && (
          <div
            style={{
              position: 'absolute',
              zIndex: 10,
              top: '50%',
              left: '70%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <SquatCounter />
          </div>
        )}
        {mode === 'finish' &&
          <div
            style={{
              position: 'absolute',
              zIndex: 10,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <FinaleMenu />
          </div>}

        <VRMCanvas />
      </div>
    </Layout>
  )
}

export default Home
