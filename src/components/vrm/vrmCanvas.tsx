/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber'
import { VRMAvatar } from './vrmAvatar1'
import { Suspense, useEffect, useRef } from 'react'
import { CameraControls } from './cameraControls'
import { useSettingsStore } from 'src/stores/settingsStore'
import shallow from 'zustand/shallow'
import { useMediaQuery } from '@mantine/hooks'
import { useVrmStore } from 'src/stores/vrmStore'

const VRMCanvas = () => {
  const { mode } = useSettingsStore(
    (state) => ({
      mode: state.mode,
    }),
    shallow,
  )
  const { setAnimation } = useVrmStore(
    (state) => ({
      setAnimation: state.setAnimation,
    }),
    shallow,
  )
  const cameraControls = useRef<CameraControls | null>(null)
  const md = useMediaQuery('(min-width: 1000px)')
  useEffect(() => {
    setAnimation('idle')
    if (['study'].includes(mode)) {
      if (cameraControls.current) {
        cameraControls.current.reset(true)
        if (md) {
          cameraControls.current.moveTo(0.2, 0.5, -3, true)
        } else {
          cameraControls.current.moveTo(0, 0.5, -3, true)
        }
        cameraControls.current.enabled = false
      }
    } else if (['initial'].includes(mode)) {
      if (cameraControls.current) {
        cameraControls.current.reset(true)
        cameraControls.current.enabled = true
      }
    } else if (['fitness'].includes(mode)) {
      if (cameraControls.current) {
        cameraControls.current.reset(true)
        if (md) {
          cameraControls.current.moveTo(0.6, 0, 0, true)
        } else {
          cameraControls.current.moveTo(0, 0, 0, true)
        }
        cameraControls.current.enabled = false
      }
    } else if (['break'].includes(mode)) {
      if (cameraControls.current) {
        cameraControls.current.reset(true)
        if (md) {
          cameraControls.current.moveTo(0.2, 0.5, -3, true)
        } else {
          cameraControls.current.moveTo(0, 0.5, -3, true)
        }
        cameraControls.current.enabled = false
      }
    }
  }, [mode, md])

  return (
    <Canvas camera={{ fov: 20 }}>
      <spotLight position={[0, 50, 50]} />
      <Suspense fallback={null}>
        <VRMAvatar />
      </Suspense>
      <CameraControls ref={cameraControls} />
    </Canvas>
  )
}

export default VRMCanvas
