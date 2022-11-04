import { useEffect, useRef } from 'react'
import { useAnimations, useFBX } from '@react-three/drei'
import { useVrmStore } from 'src/stores/vrmStore'
import shallow from 'zustand/shallow'
import { VRM } from '@pixiv/three-vrm'
import { mixamoToVrm } from './mixamoToVrm'
import { useFrame } from '@react-three/fiber'

export const AnimationNames = [
  'StandingGreeting',
  'AirSquatBentArms',
  'idle',
] as const

export const useAnimation = (vrm: VRM) => {
  const { animation } = useVrmStore(
    (state) => ({
      animation: state.animation,
    }),
    shallow,
  )
  const previousAnimation = usePrevious(animation)

  const animationClips: THREE.AnimationClip[] = []
  AnimationNames.forEach((name) => {
    const fbx = useFBX(`/animations/${name}.fbx`)
    const vrmAnimation = mixamoToVrm(name, vrm, fbx)
    animationClips.push(vrmAnimation)
  })

  const { actions, ref } = useAnimations(animationClips)

  useEffect(() => {
    if (previousAnimation) {
      actions[previousAnimation]?.fadeOut(0.2)
      actions[animation]?.stop()
    }
    actions[animation]?.play()
    actions[animation]?.fadeIn(0.2)
  }, [actions, animation, previousAnimation])

  useFrame((state, delta) => {
    vrm.update(delta)
  })

  return ref
}

function usePrevious(value: any) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}
