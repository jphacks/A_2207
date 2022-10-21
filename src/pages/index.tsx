import type { NextPage } from 'next'
import VRMCanvas from 'src/components/vrm/vrmCanvas'
import StartButton from 'src/components/main/startButton'
import StudyCounter from 'src/components/main/studyCounter'
import ChoiceButton from 'src/components/main/choiceButton'
import SquatCounter from 'src/components/main/squatCounter'
import BreakCounter from 'src/components/main/breakCounter'
import FinaleMenu from 'src/components/main/finaleMenu'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'
import Layout from 'src/components/layout/mainLayout'
import GoalViewer from 'src/components/main/goalViewer'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../components/firebase/firebase'

const Home: NextPage = () => {
  const { mode } = useSettingsStore(
    (state) => ({
      mode: state.mode,
    }),
    shallow,
  )
  const [user] = useAuthState(auth as any)
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
            {user ? <p>ログインしてます</p> : <p>ログインしてない</p>}
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
        {mode === 'choice' && (
          <div
            style={{
              position: 'absolute',
              zIndex: 10,
              top: '50%',
              left: '70%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <ChoiceButton />
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
        {mode === 'break' && (
          <div
            style={{
              position: 'absolute',
              zIndex: 10,
              top: '50%',
              left: '70%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <BreakCounter />
          </div>
        )}
        {mode === 'finish' && (
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
          </div>
        )}

        <VRMCanvas />
      </div>
    </Layout>
  )
}

export default Home
