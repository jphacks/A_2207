import type { NextPage } from 'next'
import VRMCanvas from 'src/components/charaVisualize/vrmCanvas'
import StartButton from 'src/components/main/startButton'
import StudyCounter from 'src/components/main/studyCounter'
import SquatCounter from 'src/components/main/squatCounter'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'
import Layout from 'src/components/layout/mainLayout'
import Signin from 'src/components/firebase/Signin'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../components/firebase/firebase"

const Home: NextPage = () => {
  const { mode } = useSettingsStore(
    (state) => ({
      mode: state.mode,
    }),
    shallow,
  )
  const [user] = useAuthState(auth);
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
        {mode === 'bress' && <div>bress</div>}

        <VRMCanvas />
      </div>
    </Layout>
  )
}

export default Home
