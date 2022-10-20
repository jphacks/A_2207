import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import * as THREE_VRM from '@pixiv/three-vrm'
import * as THREE from 'three'

export function loadMixamoAnimation(
  name: string,
  url: string,
  vrm: THREE_VRM.VRM,
) {
  const loader = new FBXLoader() // A loader which loads FBX
  return loader.loadAsync(url).then((asset) => {
    const clip = THREE.AnimationClip.findByName(asset.animations, 'mixamo.com') // extract the AnimationClip

    const tracks: any[] | undefined = [] // KeyframeTracks compatible with VRM will be added here

    const restRotationInverse = new THREE.Quaternion()
    const parentRestWorldRotation = new THREE.Quaternion()
    const _quatA = new THREE.Quaternion()
    const _vec3 = new THREE.Vector3()

    // Adjust with reference to hips height.
    const motionHipsHeight =
      asset.getObjectByName('mixamorigHips')?.position.y || 0
    const vrmHipsY =
      vrm.humanoid?.getNormalizedBoneNode('hips')?.getWorldPosition(_vec3).y ||
      0
    const vrmRootY = vrm.scene.getWorldPosition(_vec3).y
    const vrmHipsHeight = Math.abs(vrmHipsY - vrmRootY)
    const hipsPositionScale = vrmHipsHeight / motionHipsHeight

    clip.tracks.forEach((track) => {
      // Convert each tracks for VRM use, and push to `tracks`
      const trackSplitted = track.name.split('.')
      const mixamoRigName = trackSplitted[0]
      const vrmBoneName =
        mixamoVRMRigMap[mixamoRigName as keyof mixamoVRMRigMapProps]
      const vrmNodeName = vrm.humanoid?.getNormalizedBoneNode(
        vrmBoneName as THREE_VRM.VRMHumanBoneName,
      )?.name
      const mixamoRigNode = asset.getObjectByName(mixamoRigName)

      if (vrmNodeName != null) {
        const propertyName = trackSplitted[1]

        // Store rotations of rest-pose.
        mixamoRigNode?.getWorldQuaternion(restRotationInverse).invert()
        mixamoRigNode?.parent?.getWorldQuaternion(parentRestWorldRotation)

        if (track instanceof THREE.QuaternionKeyframeTrack) {
          // Retarget rotation of mixamoRig to NormalizedBone.
          for (let i = 0; i < track.values.length; i += 4) {
            const flatQuaternion = track.values.slice(i, i + 4)

            _quatA.fromArray(flatQuaternion)

            // 親のレスト時ワールド回転 * トラックの回転 * レスト時ワールド回転の逆
            _quatA
              .premultiply(parentRestWorldRotation)
              .multiply(restRotationInverse)

            _quatA.toArray(flatQuaternion)

            flatQuaternion.forEach((v, index) => {
              track.values[index + i] = v
            })
          }

          tracks.push(
            new THREE.QuaternionKeyframeTrack(
              `${vrmNodeName}.${propertyName}`,
              track.times,
              track.values.map((v, i) =>
                vrm.meta?.metaVersion === '0' && i % 2 === 0 ? -v : v,
              ),
            ),
          )
        } else if (track instanceof THREE.VectorKeyframeTrack) {
          const value = track.values.map(
            (v, i) =>
              (vrm.meta?.metaVersion === '0' && i % 3 !== 1 ? -v : v) *
              hipsPositionScale,
          )
          tracks.push(
            new THREE.VectorKeyframeTrack(
              `${vrmNodeName}.${propertyName}`,
              track.times,
              value,
            ),
          )
        }
      }
    })

    return new THREE.AnimationClip(name, clip.duration, tracks)
  })
}

type mixamoVRMRigMapProps = {
  mixamorigHips: string
  mixamorigSpine: string
  mixamorigSpine1: string
  mixamorigSpine2: string
  mixamorigNeck: string
  mixamorigHead: string
  mixamorigLeftShoulder: string
  mixamorigLeftArm: string
  mixamorigLeftForeArm: string
  mixamorigLeftHand: string
  mixamorigLeftHandThumb1: string
  mixamorigLeftHandThumb2: string
  mixamorigLeftHandThumb3: string
  mixamorigLeftHandIndex1: string
  mixamorigLeftHandIndex2: string
  mixamorigLeftHandIndex3: string
  mixamorigLeftHandMiddle1: string
  mixamorigLeftHandMiddle2: string
  mixamorigLeftHandMiddle3: string
  mixamorigLeftHandRing1: string
  mixamorigLeftHandRing2: string
  mixamorigLeftHandRing3: string
  mixamorigLeftHandPinky1: string
  mixamorigLeftHandPinky2: string
  mixamorigLeftHandPinky3: string
  mixamorigRightShoulder: string
  mixamorigRightArm: string
  mixamorigRightForeArm: string
  mixamorigRightHand: string
  mixamorigRightHandPinky1: string
  mixamorigRightHandPinky2: string
  mixamorigRightHandPinky3: string
  mixamorigRightHandRing1: string
  mixamorigRightHandRing2: string
  mixamorigRightHandRing3: string
  mixamorigRightHandMiddle1: string
  mixamorigRightHandMiddle2: string
  mixamorigRightHandMiddle3: string
  mixamorigRightHandIndex1: string
  mixamorigRightHandIndex2: string
  mixamorigRightHandIndex3: string
  mixamorigRightHandThumb1: string
  mixamorigRightHandThumb2: string
  mixamorigRightHandThumb3: string
  mixamorigLeftUpLeg: string
  mixamorigLeftLeg: string
  mixamorigLeftFoot: string
  mixamorigLeftToeBase: string
  mixamorigRightUpLeg: string
  mixamorigRightLeg: string
  mixamorigRightFoot: string
  mixamorigRightToeBase: string
}

const mixamoVRMRigMap: mixamoVRMRigMapProps = {
  mixamorigHips: 'hips',
  mixamorigSpine: 'spine',
  mixamorigSpine1: 'chest',
  mixamorigSpine2: 'upperChest',
  mixamorigNeck: 'neck',
  mixamorigHead: 'head',
  mixamorigLeftShoulder: 'leftShoulder',
  mixamorigLeftArm: 'leftUpperArm',
  mixamorigLeftForeArm: 'leftLowerArm',
  mixamorigLeftHand: 'leftHand',
  mixamorigLeftHandThumb1: 'leftThumbProximal',
  mixamorigLeftHandThumb2: 'leftThumbIntermediate',
  mixamorigLeftHandThumb3: 'leftThumbDistal',
  mixamorigLeftHandIndex1: 'leftIndexProximal',
  mixamorigLeftHandIndex2: 'leftIndexIntermediate',
  mixamorigLeftHandIndex3: 'leftIndexDistal',
  mixamorigLeftHandMiddle1: 'leftMiddleProximal',
  mixamorigLeftHandMiddle2: 'leftMiddleIntermediate',
  mixamorigLeftHandMiddle3: 'leftMiddleDistal',
  mixamorigLeftHandRing1: 'leftRingProximal',
  mixamorigLeftHandRing2: 'leftRingIntermediate',
  mixamorigLeftHandRing3: 'leftRingDistal',
  mixamorigLeftHandPinky1: 'leftLittleProximal',
  mixamorigLeftHandPinky2: 'leftLittleIntermediate',
  mixamorigLeftHandPinky3: 'leftLittleDistal',
  mixamorigRightShoulder: 'rightShoulder',
  mixamorigRightArm: 'rightUpperArm',
  mixamorigRightForeArm: 'rightLowerArm',
  mixamorigRightHand: 'rightHand',
  mixamorigRightHandPinky1: 'rightLittleProximal',
  mixamorigRightHandPinky2: 'rightLittleIntermediate',
  mixamorigRightHandPinky3: 'rightLittleDistal',
  mixamorigRightHandRing1: 'rightRingProximal',
  mixamorigRightHandRing2: 'rightRingIntermediate',
  mixamorigRightHandRing3: 'rightRingDistal',
  mixamorigRightHandMiddle1: 'rightMiddleProximal',
  mixamorigRightHandMiddle2: 'rightMiddleIntermediate',
  mixamorigRightHandMiddle3: 'rightMiddleDistal',
  mixamorigRightHandIndex1: 'rightIndexProximal',
  mixamorigRightHandIndex2: 'rightIndexIntermediate',
  mixamorigRightHandIndex3: 'rightIndexDistal',
  mixamorigRightHandThumb1: 'rightThumbProximal',
  mixamorigRightHandThumb2: 'rightThumbIntermediate',
  mixamorigRightHandThumb3: 'rightThumbDistal',
  mixamorigLeftUpLeg: 'leftUpperLeg',
  mixamorigLeftLeg: 'leftLowerLeg',
  mixamorigLeftFoot: 'leftFoot',
  mixamorigLeftToeBase: 'leftToes',
  mixamorigRightUpLeg: 'rightUpperLeg',
  mixamorigRightLeg: 'rightLowerLeg',
  mixamorigRightFoot: 'rightFoot',
  mixamorigRightToeBase: 'rightToes',
}
