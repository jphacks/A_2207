/* eslint-disable */
import React, {
  forwardRef,
  ForwardedRef,
  MutableRefObject,
  useEffect,
  useRef,
} from 'react'
import {
  MOUSE,
  Vector2,
  Vector3,
  Vector4,
  Quaternion,
  Matrix4,
  Spherical,
  Box3,
  Sphere,
  Raycaster,
  MathUtils,
} from 'three'
import { ReactThreeFiber, extend, useFrame, useThree } from '@react-three/fiber'
import CameraControlsDefault from 'camera-controls'
import { useSettingsStore } from 'src/stores/settingsStore'
import shallow from 'zustand/shallow'
import { useMediaQuery } from '@mantine/hooks'
import { Stage } from '@react-three/drei'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      cameraControlsDefault: ReactThreeFiber.Node<
        CameraControlsDefault,
        typeof CameraControlsDefault
      >
    }
  }
}

const subsetOfTHREE = {
  MOUSE: MOUSE,
  Vector2: Vector2,
  Vector3: Vector3,
  Vector4: Vector4,
  Quaternion: Quaternion,
  Matrix4: Matrix4,
  Spherical: Spherical,
  Box3: Box3,
  Sphere: Sphere,
  Raycaster: Raycaster,
  MathUtils: {
    DEG2RAD: MathUtils.DEG2RAD,
    clamp: MathUtils.clamp,
  },
}

CameraControlsDefault.install({ THREE: subsetOfTHREE })
extend({ CameraControlsDefault })

export const CameraControls = forwardRef<CameraControlsDefault, unknown>(
  (_, ref) => {
    const cameraControls = useRef<CameraControlsDefault | null>(null)
    const camera = useThree((state) => state.camera)
    const renderer = useThree((state) => state.gl)
    const { mode } = useSettingsStore(
      (state) => ({
        mode: state.mode,
      }),
      shallow,
    )
    // useEffect(() => {
    //   const intervalId = setInterval(() => {
    //     console.log(camera)
    //   }, 1000)
    //   return () => {
    //     clearInterval(intervalId)
    //   }
    // }, [])

    const md = useMediaQuery('(min-width: 992px)')
    useEffect(() => {
      if (cameraControls.current) {
        cameraControls.current.reset(true)
        cameraControls.current.enabled = false
        if (['study'].includes(mode)) {
          if (md) {
            cameraControls.current.setPosition(1.8, 0.23, 2.6, true)
          } else {
            cameraControls.current.setPosition(1.4, 0.05, 2.8, true)
          }
        } else if (['initial'].includes(mode)) {
          cameraControls.current.enabled = true
        } else if (['fitness'].includes(mode)) {
          if (md) {
            cameraControls.current.setPosition(-6.32, 1.66, 8.84, true)
            cameraControls.current.setTarget(1, -0.3, 0, true)
            cameraControls.current.dolly(4.3, true)
          } else {
            cameraControls.current.setPosition(-5.22, 1.66, 8.84, true)
            cameraControls.current.setTarget(0, -0.2, 0, true)
            cameraControls.current.dolly(3.6, true)
          }
        } else if (['break'].includes(mode)) {
          cameraControls.current.enabled = true
          if (md) {
            cameraControls.current.setPosition(-1, 1, 4, true)
            cameraControls.current.setTarget(0.3, 0, 0, true)
          } else {
            cameraControls.current.setPosition(0, 1.5, 4, true)
          }
        }
      }
    }, [mode, md])

    useFrame((_, delta) => cameraControls.current?.update(delta))
    useEffect(() => () => cameraControls.current?.dispose(), [])
    return (
      <cameraControlsDefault
        ref={mergeRefs<CameraControlsDefault>(cameraControls, ref)}
        args={[camera, renderer.domElement]}
      />
    )
  },
)

export type CameraControls = CameraControlsDefault

function mergeRefs<T>(...refs: (MutableRefObject<T> | ForwardedRef<T>)[]) {
  return (instance: T): void => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(instance)
      } else if (ref) {
        ref.current = instance
      }
    }
  }
}
