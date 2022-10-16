import type { NextPage } from 'next'
import VRMCanvas from 'src/components/charaVisualize/vrmCanvas'
import StartButton from 'src/components/main/startButton'
import shallow from 'zustand/shallow'
import { useSettingsStore } from 'src/stores/settingsStore'

const Home: NextPage = () => {
  const { mode } = useSettingsStore(
    (state) => ({
      mode: state.mode,
    }),
    shallow,
  )
  return (
    <div className="container">
      <div
        style={{
          position: 'absolute',
          zIndex: 10,
          width: '100%',
          height: '100%',
        }}
      >
        {mode === 'initial' && <StartButton />}
        {mode === 'study' && <div>study</div>}
        {mode === 'fitness' && <div>fitness</div>}
        {mode === 'bress' && <div>bress</div>}
      </div>
      <VRMCanvas />
    </div>
  )
}

export default Home
