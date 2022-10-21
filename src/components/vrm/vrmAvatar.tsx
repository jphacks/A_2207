/* eslint-disable react/no-unknown-property */

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE_VRM from '@pixiv/three-vrm'
import * as THREE from 'three'
import { useEffect } from 'react'
import { loadMixamoAnimation } from 'src/components/vrm/loadMixamoAnimation'
import { useThree } from 'react-three-fiber'
import { useSettingsStore } from 'src/stores/settingsStore'
import shallow from 'zustand/shallow'
import { useVrmStore } from 'src/stores/vrmStore'
import GUI from 'lil-gui'

type modelNameToUrl = {
  AliciaSolid: string
  Tsukuyomi: string
}
const modelNameToUrl = {
  AliciaSolid: '/models/AliciaSolid.vrm',
  Tsukuyomi: '/models/Tsukuyomi.vrm',
  Miraikomachi: '/models/Miraikomachi.vrm',
} as modelNameToUrl

export const VRMAvatar = () => {
  const { scene } = useThree()
  const { modelName } = useSettingsStore(
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
  const { animation } = useVrmStore(
    (state) => ({
      animation: state.animation,
    }),
    shallow,
  )

  /* ---------------------------------- 初期設定 ---------------------------------- */
  // https://github.com/pixiv/three-vrm/tree/dev/packages/three-vrm/examples/humanoidAnimation
  useEffect(() => {
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
        vrm.scene.position.setY(-0.8)
        if (currentVrm) {
          scene.remove(currentVrm.scene)
          THREE_VRM.VRMUtils.deepDispose(currentVrm.scene)
        }
        currentVrm = vrm
        currentMixer = new THREE.AnimationMixer(vrm.scene)
        scene.add(vrm.scene)
        vrm.scene.traverse((obj: any) => {
          if (obj.isMesh) {
            obj.castShadow = true
            obj.receiveShadow = true
          }
          obj.frustumCulled = false
        })
        THREE_VRM.VRMUtils.rotateVRM0(vrm)
        Object.keys(baseActions).forEach((name) => {
          loadMixamoAnimation(name, `/animations/${name}.fbx`, vrm).then(
            (clip) => {
              if (currentMixer) {
                const action = currentMixer.clipAction(clip)
                activateAction(action)
                const name = clip.name
                baseActions[name as keyof baseActionsProps].action = action
              }
            },
          )
        })
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

    /* --------------------------- vrmの挙動を確かめる用のPanel --------------------------- */
    // createPanel()

    animate()
  }, [modelName])

  /* ---------------------------- animationが変更されたとき --------------------------- */
  useEffect(() => {
    const settings = baseActions[animation as keyof baseActionsProps]
    const currentSettings =
      baseActions[currentBaseAction as keyof baseActionsProps]
    const currentAction = currentSettings ? currentSettings.action : null
    const action = settings ? settings.action : null
    if (currentAction !== action) {
      prepareCrossFade(currentAction, action, 0.35)
    }
  }, [animation])

  return <></>
}

/* -------------------------------- vrmの挙動の制御 ------------------------------- */
// https://threejs.org/examples/#webgl_animation_skinning_additive_blending
let currentVrm: THREE_VRM.VRM | undefined = undefined
let currentMixer: THREE.AnimationMixer | undefined = undefined
const clock = new THREE.Clock()
let currentBaseAction = 'idle'
const crossFadeControls: any[] = []
type panelSettingsProps = {
  idle?: () => void
  GangnamStyle?: () => void
  BreakdanceEnding1?: () => void
  StandingGreeting?: () => void
}
let panelSettings: panelSettingsProps
type baseActionsItemProps = {
  weight: number
  action?: THREE.AnimationAction
}
type baseActionsProps = {
  idle: baseActionsItemProps
  GangnamStyle: baseActionsItemProps
  BreakdanceEnding1: baseActionsItemProps
  StandingGreeting: baseActionsItemProps
}
const baseActions: baseActionsProps = {
  idle: { weight: 1 },
  GangnamStyle: { weight: 0 },
  BreakdanceEnding1: { weight: 0 },
  StandingGreeting: { weight: 0 },
}
function setWeight(action: THREE.AnimationAction, weight: number) {
  action.enabled = true
  action.setEffectiveTimeScale(1)
  action.setEffectiveWeight(weight)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createPanel() {
  const panel = new GUI({ width: 310 })
  const folder1 = panel.addFolder('Base Actions')
  panelSettings = {}
  const baseNames = ['None', ...Object.keys(baseActions)]
  for (let i = 0, l = baseNames.length; i !== l; ++i) {
    const name = baseNames[i]
    const settings = baseActions[name as keyof baseActionsProps]
    panelSettings[name as keyof panelSettingsProps] = function () {
      const currentSettings =
        baseActions[currentBaseAction as keyof baseActionsProps]
      const currentAction = currentSettings ? currentSettings.action : null
      const action = settings ? settings.action : null

      if (currentAction !== action) {
        prepareCrossFade(currentAction, action, 0.35)
      }
    }
    crossFadeControls.push(folder1.add(panelSettings, name))
  }

  folder1.open()

  crossFadeControls.forEach(function (control) {
    control.setInactive = function () {
      control.domElement.classList.add('control-inactive')
    }
    control.setActive = function () {
      control.domElement.classList.remove('control-inactive')
    }
    const settings = baseActions[control.property as keyof baseActionsProps]

    if (!settings || !settings.weight) {
      control.setInactive()
    }
  })
}

function activateAction(action: THREE.AnimationAction) {
  const clip = action.getClip()
  const settings = baseActions[clip.name as keyof baseActionsProps]
  setWeight(action, settings.weight)
  action.play()
}

function prepareCrossFade(
  startAction: THREE.AnimationAction | null | undefined,
  endAction: THREE.AnimationAction | null | undefined,
  duration: number,
) {
  if (currentBaseAction === 'idle' || !startAction || !endAction) {
    executeCrossFade(startAction, endAction, duration)
  } else {
    synchronizeCrossFade(startAction, endAction, duration)
  }
  if (endAction) {
    const clip = endAction.getClip()
    currentBaseAction = clip.name
  } else {
    currentBaseAction = 'None'
  }
  crossFadeControls.forEach(function (control) {
    const name = control.property
    if (name === currentBaseAction) {
      control.setActive()
    } else {
      control.setInactive()
    }
  })
}

function synchronizeCrossFade(
  startAction: THREE.AnimationAction | null | undefined,
  endAction: THREE.AnimationAction | null | undefined,
  duration: number,
) {
  currentMixer?.addEventListener('loop', onLoopFinished)
  function onLoopFinished(event: any) {
    if (event.action === startAction) {
      currentMixer?.removeEventListener('loop', onLoopFinished)
      executeCrossFade(startAction, endAction, duration)
    }
  }
}

function executeCrossFade(
  startAction: THREE.AnimationAction | null | undefined,
  endAction: THREE.AnimationAction | null | undefined,
  duration: number,
) {
  if (endAction) {
    setWeight(endAction, 1)
    endAction.time = 2
    if (startAction) {
      startAction.reset().reset().crossFadeTo(endAction, duration, true)
    } else {
      endAction.reset().reset().fadeIn(duration)
    }
  } else {
    startAction?.reset().reset().fadeOut(duration)
  }
}

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
