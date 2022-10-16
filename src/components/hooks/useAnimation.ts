import { useEffect } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useAnimationStore } from 'src/stores/animtionStore'
import shallow from 'zustand/shallow'
import { AnimationNames } from 'src/types/animationParams'
import { useMixiamoAnimation } from '../hooks/useMixiamoAnimation'
import { VRM } from '@pixiv/three-vrm'

export const useAnimation = (vrm: VRM) => {
  const { animation, isPaused } = useAnimationStore(
    (state) => ({
      animation: state.animation,
      isPaused: state.isPaused,
    }),
    shallow,
  )
  const animationClips: THREE.AnimationClip[] = []
  AnimationNames.forEach((name) => {
    const { animations } = useGLTF(`/animations/${name}.glb`)
    const mixamoAnimation = useMixiamoAnimation(name, animations[0], vrm)
    animationClips.push(mixamoAnimation)
  })

  const { actions, ref } = useAnimations(animationClips, vrm?.scene)

  // animation
  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.5).play()
    console.log(actions[animation])
    return () => void actions[animation]?.fadeOut(0.5)
  }, [actions, animation])

  // pause
  useEffect(() => {
    const action = actions[animation]
    if (action) {
      action.paused = isPaused
    }
  }, [actions, animation, isPaused])

  return ref
}
