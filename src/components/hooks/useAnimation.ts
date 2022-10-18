import { useEffect } from 'react'
import { useAnimations } from '@react-three/drei'
import { useAnimationStore } from 'src/stores/animtionStore'
import shallow from 'zustand/shallow'
import { AnimationNames } from 'src/types/animationParams'
import { useMixiamoAnimation } from '../hooks/useMixiamoAnimation'
import { VRM } from '@pixiv/three-vrm'
import { useLoader } from 'react-three-fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

export const useAnimation = (gltf: GLTF | undefined) => {
  const { animation, isPaused } = useAnimationStore(
    (state) => ({
      animation: state.animation,
      isPaused: state.isPaused,
    }),
    shallow,
  )
  const animationClips: THREE.AnimationClip[] = []
  AnimationNames.forEach((name) => {
    const { animations } = useLoader(FBXLoader, `/animations/GangnamStyle.fbx`)
    const mixamoAnimation = useMixiamoAnimation(
      name,
      animations[0],
      gltf?.userData.vrm,
    )
    animationClips.push(mixamoAnimation)
  })

  const { actions, ref } = useAnimations(animationClips, gltf?.scene)
  actions[animation]?.reset().fadeIn(0.5).play()
  console.log(actions[animation], animation)

  // // pause
  // useEffect(() => {
  //   const action = actions[animation]
  //   if (action) {
  //     action.paused = isPaused
  //   }
  // }, [actions, animation, isPaused])

  return ref
}
