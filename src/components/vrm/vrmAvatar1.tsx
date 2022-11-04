/* eslint-disable react/no-unknown-property */

import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE_VRM from '@pixiv/three-vrm'
import { useEffect } from 'react'
import { useAnimation } from './useAnimation'
import { useVrmStore } from 'src/stores/vrmStore'
import shallow from 'zustand/shallow'

type modelNameToUrlType = {
  AliciaSolid: string
  Miraikomachi: string
}
const modelNameToUrl = {
  AliciaSolid: '/models/AliciaSolid.vrm',
  Miraikomachi: '/models/Miraikomachi.vrm',
} as modelNameToUrlType

export const VRMAvatar = () => {
  const { modelName, inputVrmModel } = useVrmStore(
    (state) => ({
      animation: state.animation,
      inputVrmModel: state.inputVrmModel,
      expression: state.expression,
      modelName: state.modelName,
      setAnimation: state.setAnimation,
    }),
    shallow,
  )
  const gltf = useLoader(
    GLTFLoader,
    modelNameToUrl[modelName as keyof modelNameToUrlType],
    (loader: any) => {
      loader.crossOrigin = 'anonymous'
      loader.register((parser: any) => {
        return new THREE_VRM.VRMLoaderPlugin(parser, {
          autoUpdateHumanBones: true,
        })
      })
    },
  )

  const vrm = gltf.userData.vrm as THREE_VRM.VRM

  useEffect(() => {
    THREE_VRM.VRMUtils.deepDispose(vrm.scene)
    vrm.scene.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
      obj.frustumCulled = false
    })
    THREE_VRM.VRMUtils.rotateVRM0(vrm)
  }, [vrm, gltf])

  const ref = useAnimation(vrm)
  console.log(gltf)

  return (
    <>
      {vrm ? (
        <>
          <group dispose={null}>
            <primitive object={vrm.scene} position={[0, -0.8, 0]} ref={ref} />
          </group>
        </>
      ) : null}
    </>
  )
}
