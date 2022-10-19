/* eslint-disable react/no-unknown-property */

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE_VRM from '@pixiv/three-vrm'
import * as THREE from 'three'
import { useEffect } from 'react'
import { loadMixamoAnimation } from 'src/utils/loadMixamoAnimation'
import { useThree } from 'react-three-fiber'
import { useSettingsStore } from 'src/stores/settingsStore'
import shallow from 'zustand/shallow'
import { useAnimationStore } from 'src/stores/animtionStore'

type modelNameToUrl = {
  AliciaSolid: string
  Tsukuyomi: string
}
const modelNameToUrl = {
  AliciaSolid: '/models/AliciaSolid.vrm',
  Tsukuyomi: '/models/Tsukuyomi.vrm',
} as modelNameToUrl

let currentVrm: THREE_VRM.VRM | undefined = undefined
let currentMixer: THREE.AnimationMixer | undefined = undefined
const clock = new THREE.Clock()

export const VRMAvatar = () => {
  const { scene } = useThree()

  const {
    mode,
    modelName,
    positionX,
    positionY,
    positionZ,
    setPositionX,
    setPositionY,
    setPositionZ,
  } = useSettingsStore(
    (state) => ({
      mode: state.mode,
      modelName: state.modelName,
      positionX: state.positionX,
      positionY: state.positionY,
      positionZ: state.positionZ,
      setPositionX: state.setPositionX,
      setPositionY: state.setPositionY,
      setPositionZ: state.setPositionZ,
    }),
    shallow,
  )
  const { animation } = useAnimationStore(
    (state) => ({
      animation: state.animation,
    }),
    shallow,
  )

  useEffect(() => {
    if (['study', 'fitness', 'bress'].includes(mode)) {
      setPositionX(-0.2)
      setPositionY(-1.3)
      setPositionZ(3.0)
    } else if (['initial'].includes(mode)) {
      setPositionX(0)
      setPositionY(-0.8)
      setPositionZ(0)
    }
  }, [currentVrm, mode])

  useEffect(() => {
    if (currentVrm) {
      currentVrm.scene.position.setX(positionX)
      currentVrm.scene.position.setY(positionY)
      currentVrm.scene.position.setZ(positionZ)
    }
  }, [currentVrm, positionX, positionY, positionZ])

  useEffect(() => {
    // ground
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2000, 2000),
      new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }),
    )
    mesh.rotation.x = -Math.PI / 2
    mesh.receiveShadow = true
    scene.add(mesh)

    const loader = new GLTFLoader()
    loader.crossOrigin = 'anonymous'
    loader.register((parser) => {
      return new THREE_VRM.VRMLoaderPlugin(parser, {
        autoUpdateHumanBones: true,
      })
    })
    loader.load(
      modelNameToUrl[modelName as keyof modelNameToUrl],
      (gltf) => {
        const vrm = gltf.userData.vrm
        vrm.scene.position.setX(positionX)
        vrm.scene.position.setY(positionY)
        vrm.scene.position.setZ(positionZ)

        if (currentVrm) {
          scene.remove(currentVrm.scene)
          THREE_VRM.VRMUtils.deepDispose(currentVrm.scene)
        }
        currentVrm = vrm
        scene.add(vrm.scene)
        vrm.scene.traverse((obj: any) => {
          if (obj.isMesh) {
            obj.castShadow = true
            obj.receiveShadow = true
          }
          obj.frustumCulled = false
        })
        THREE_VRM.VRMUtils.rotateVRM0(vrm)
        if (currentVrm) {
          currentMixer = new THREE.AnimationMixer(currentVrm.scene)
          loadMixamoAnimation(
            animation,
            `/animations/${animation}.fbx`,
            vrm,
          ).then((clip) => {
            currentMixer?.clipAction(clip).reset().fadeIn(0.1).play()
          })
        }
      },
      (progress) => {
        console.log(
          'Loading model...',
          100.0 * (progress.loaded / progress.total),
          '%',
        )
      },
      (error) => console.error(error),
    )

    function animate() {
      requestAnimationFrame(animate)
      const deltaTime = clock.getDelta()
      if (currentMixer) {
        currentMixer.update(deltaTime)
      }
      if (currentVrm) {
        currentVrm.update(deltaTime)
      }
    }
    animate()
  }, [modelName, animation])

  return <></>
}
