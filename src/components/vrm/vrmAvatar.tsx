/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-unknown-property */

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE_VRM from '@pixiv/three-vrm'
import * as THREE from 'three'
import { useEffect, useState } from 'react'
import { loadMixamoAnimation } from 'src/components/vrm/loadMixamoAnimation'
import shallow from 'zustand/shallow'
import { useVrmStore } from 'src/stores/vrmStore'
import GUI from 'lil-gui'
import { useThree } from '@react-three/fiber'
import { useSettingsStore } from 'src/stores/settingsStore'

type modelNameToUrl = {
  AliciaSolid: string
  Miraikomachi: string
}
const modelNameToUrl = {
  AliciaSolid: '/models/AliciaSolid.vrm',
  Miraikomachi: '/models/Miraikomachi.vrm',
} as modelNameToUrl

export const AnimationNames = [
  'AirSquatBentArms',
  'ArmStretching',
  'idle',
  'SittingIdle',
  'Typing',
  'Waving',
  'FemaleSittingPose',
  'Thankful',
  'Clapping',
  'StandingGreeting',
] as const
const states = ['idle', 'SittingIdle', 'Typing', 'Clapping']
const emotes = [
  'AirSquatBentArms',
  'Waving',
  'ArmStretching',
  'FemaleSittingPose',
  'Thankful',
  'StandingGreeting',
]

export const VRMAvatar = () => {
  const { gl, scene, camera } = useThree()
  const {
    animation,
    modelName,
    inputVrmModel,
    emote,
    emoteFinish,
    setAnimation,
  } = useVrmStore(
    (state) => ({
      animation: state.animation,
      inputVrmModel: state.inputVrmModel,
      modelName: state.modelName,
      emote: state.emote,
      emoteFinish: state.emoteFinish,
      setAnimation: state.setAnimation,
    }),
    shallow,
  )
  const { mode } = useSettingsStore(
    (state) => ({
      mode: state.mode,
    }),
    shallow,
  )
  const [loaded, setLoaded] = useState(false)
  const setExpression = (name: string, weight: number) => {
    expression = { name, weight }
    vrm?.expressionManager?.setValue(expression.name, expression.weight)
  }
  const clearExpression = () => {
    if (expression) {
      vrm?.expressionManager?.setValue(expression.name, 0)
      expression = undefined
    }
  }

  /* ---------------------------------- 初期設定 ---------------------------------- */
  useEffect(() => {
    setLoaded(false)
    gl.outputEncoding = THREE.sRGBEncoding
    light = new THREE.DirectionalLight(0xffffff)
    light.position.set(-1.0, 1.0, 1.0).normalize()
    light.castShadow = true
    scene.add(light)

    const loader = new GLTFLoader()
    loader.crossOrigin = 'anonymous'
    loader.register((parser) => {
      return new THREE_VRM.VRMLoaderPlugin(parser, {
        autoUpdateHumanBones: true,
      })
    })
    let url = ''
    if (inputVrmModel) {
      const blob = new Blob([inputVrmModel], {
        type: 'application/octet-stream',
      })
      url = URL.createObjectURL(blob)
    }
    loader.load(
      url ? url : modelNameToUrl[modelName as keyof modelNameToUrl],
      (gltf) => {
        if (vrm) {
          scene.remove(vrm.scene)
          THREE_VRM.VRMUtils.deepDispose(vrm.scene)
        }
        THREE_VRM.VRMUtils.removeUnnecessaryVertices(gltf.scene)
        THREE_VRM.VRMUtils.removeUnnecessaryJoints(gltf.scene)

        vrm = gltf.userData.vrm as THREE_VRM.VRM

        mixer = new THREE.AnimationMixer(gltf.userData.vrm.scene)
        const currentVRM = gltf.userData.vrm

        currentVRM.scene.position.setY(-0.8)
        THREE_VRM.VRMUtils.rotateVRM0(vrm)

        currentVRM.scene.traverse((obj: any) => {
          if (obj.isMesh) {
            obj.castShadow = true
            obj.receiveShadow = true
          }
          obj.frustumCulled = false
        })
        AnimationNames.forEach((name) => {
          loadMixamoAnimation(name, `/animations/${name}.fbx`, currentVRM).then(
            (clip) => {
              if (mixer) {
                const action = mixer.clipAction(clip)
                const name = clip.name
                actions[name] = action
                if (emotes.indexOf(name) >= 0) {
                  action.clampWhenFinished = true
                  action.loop = THREE.LoopOnce
                }
                if (name === animation) fadeToAction(animation, 0.5)
              }
            },
          )
        })
        scene.add(vrm.scene)
        setLoaded(true)
      },
    )

    animate()

    // デバック用のGUI
    // createGUI()

    return () => {
      if (light) scene.remove(light)
    }
  }, [modelName, inputVrmModel])

  /* ----------------------------- 基本的なアニメーションの処理 ----------------------------- */
  useEffect(() => {
    if (vrm) {
      vrm.scene.rotation.set(0, 0, 0)
      THREE_VRM.VRMUtils.rotateVRM0(vrm)
      vrm.scene.position.setX(0)
      vrm.scene.position.setZ(0)
      vrm.lookAt!.target = null
      light?.position.set(-1.0, 1.0, 1.0).normalize()
      if (['study'].includes(mode)) {
        vrm.scene.rotateY(0.5 * Math.PI)
        vrm.scene.position.setX(0.4)
        vrm.scene.position.setZ(1.1)
        setAnimation('Typing')
      } else if (['initial'].includes(mode)) {
        vrm.lookAt!.target = camera
        setAnimation('idle')
      } else if (['fitness'].includes(mode)) {
        light?.position.set(1.0, 1.0, 1.0).normalize()
        vrm.lookAt!.target = camera
        vrm.scene.rotateY(-0.18 * Math.PI)
        vrm.scene.position.setX(-0.6)
        vrm.scene.position.setZ(1)
        setAnimation('idle')
      } else if (['break'].includes(mode)) {
        vrm.scene.position.setX(0)
        vrm.scene.position.setZ(-1.2)
        setAnimation('SittingIdle')
      } else if (['choice'].includes(mode)) {
        vrm.lookAt!.target = camera
        setAnimation('Clapping')
      }
    }
  }, [mode, loaded])

  useEffect(() => {
    api.state = animation
    if (states.includes(animation) && !emote) {
      fadeToAction(api.state, 0.5)
    }
  }, [animation, emote])

  /* --------------------------------- エモートの処理 -------------------------------- */
  const restoreState = () => {
    mixer?.removeEventListener('finished', restoreState)
    emoteFinish()
    clearExpression()
  }

  useEffect(() => {
    if (emote === 'StandingGreeting') {
      setExpression('happy', 1)
    }
    if (emote) {
      fadeToAction(emote, 0.2)
      mixer?.addEventListener('finished', restoreState)
    }
  }, [emote])

  return <></>
}

/* -------------------------------- vrmの挙動の制御 ------------------------------- */
// https://threejs.org/examples/#webgl_animation_skinning_morph
let vrm: THREE_VRM.VRM | undefined = undefined
let mixer: THREE.AnimationMixer | undefined = undefined
let light: THREE.DirectionalLight | undefined = undefined
let expression: { name: string; weight: number } | undefined = undefined
const actions: any = {}
let activeAction: any, previousAction: any
const clock = new THREE.Clock()
const api: any = { state: 'idle' }

function fadeToAction(name: string, duration: number) {
  previousAction = activeAction
  activeAction = actions[name]

  if (previousAction !== activeAction) {
    previousAction?.fadeOut(duration)
  }

  activeAction
    ?.reset()
    .setEffectiveTimeScale(1)
    .setEffectiveWeight(1)
    .fadeIn(duration)
    .play()
}

const blinkValue = () => {
  return Math.max(
    0,
    Math.sin((clock.elapsedTime * 1) / 3) ** 4096 +
      Math.sin((clock.elapsedTime * 4) / 7) ** 4096,
  )
}

function animate() {
  const dt = clock.getDelta()
  requestAnimationFrame(animate)
  if (mixer) mixer.update(dt)
  if (vrm) {
    vrm.expressionManager?.setValue('blink', blinkValue())
    vrm.update(dt)
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createGUI() {
  const gui = new GUI()

  // states
  const statesFolder = gui.addFolder('States')
  const clipCtrl = statesFolder.add(api, 'state').options(states)
  clipCtrl.onChange(function () {
    fadeToAction(api.state, 0.5)
  })
  statesFolder.open()

  // emotes
  const emoteFolder = gui.addFolder('Emotes')
  function createEmoteCallback(name: string) {
    api[name] = function () {
      fadeToAction(name, 0.2)
      mixer?.addEventListener('finished', restoreState)
    }
    emoteFolder.add(api, name)
  }
  function restoreState() {
    mixer?.removeEventListener('finished', restoreState)
    fadeToAction(api.state, 0.2)
  }
  for (let i = 0; i < emotes.length; i++) {
    createEmoteCallback(emotes[i])
  }
  emoteFolder.open()
}
