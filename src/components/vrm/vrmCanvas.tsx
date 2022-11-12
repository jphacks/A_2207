/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber'
import { VRMAvatar } from './vrmAvatar'
import { CameraControls } from './cameraControls'
import { Environment } from '@react-three/drei'
import { Room } from './room'
import { DropZoneFullScreen } from './element/dropZoneFullScreen'
import { useEffect, useState } from 'react'
import { environmentType, useSettingsStore } from 'src/stores/settingsStore'
import shallow from 'zustand/shallow'

const VRMCanvas = () => {
  const size = useWindowSize()
  const { environment } = useSettingsStore(
    (state) => ({
      environment: state.environment,
    }),
    shallow,
  )
  return (
    <>
      <Canvas camera={{ fov: 20 }} shadows flat style={{ height: size.height }}>
        <VRMAvatar />
        <mesh position={[0, -0.94, 0.5]} scale={0.5} rotation-y={Math.PI}>
          <Room />
        </mesh>
        <CameraControls />
        <Environment
          background={false}
          preset={environment as environmentType}
        />
      </Canvas>

      <DropZoneFullScreen />
    </>
  )
}
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowSize
}

export default VRMCanvas
