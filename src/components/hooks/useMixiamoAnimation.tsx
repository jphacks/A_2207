import { VRM, VRMHumanBoneName } from '@pixiv/three-vrm'
import {
  AnimationClip,
  QuaternionKeyframeTrack,
  VectorKeyframeTrack,
} from 'three'

export function useMixiamoAnimation(
  name: string,
  clip: AnimationClip,
  vrm: VRM,
): AnimationClip {
  const tracks: any[] = [] // VRM用のKeyframeTrackをこの配列に格納する
  clip.tracks.forEach((track) => {
    // 各TrackをVRM向けに変換し、 `tracks` に格納する
    const trackSplitted = track.name.split('.')
    const mixamoRigName = trackSplitted[0]
    const vrmBoneName =
      mixamoVRMRigMap[mixamoRigName as keyof mixamoVRMRigMapProps]
    const vrmNodeName = vrm?.humanoid?.getRawBoneNode(
      vrmBoneName as VRMHumanBoneName,
    )?.name

    if (vrmNodeName != null) {
      const propertyName = trackSplitted[1]

      if (track instanceof QuaternionKeyframeTrack) {
        tracks.push(
          new QuaternionKeyframeTrack(
            `${vrmNodeName}.${propertyName}`,
            Array.of(track.times),
            Array.of(
              track.values.map((v, i) =>
                vrm?.meta?.metaVersion === '0' && i % 2 === 0 ? -v : v,
              ),
            ),
          ),
        )
      } else if (track instanceof VectorKeyframeTrack) {
        tracks.push(
          new VectorKeyframeTrack(
            `${vrmNodeName}.${propertyName}`,
            Array.of(track.times),
            Array.of(
              track.values.map(
                (v, i) =>
                  (vrm?.meta?.metaVersion === '0' && i % 3 !== 1 ? -v : v) *
                  0.01,
              ),
            ),
          ),
        )
      }
    }
  })
  return new AnimationClip(name, clip.duration, tracks)
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
