/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber'
import { VRMAvatar } from './vrmAvatar'
import { CameraControls } from './cameraControls'
import { Environment } from '@react-three/drei'
import { Room } from './room'

const VRMCanvas = () => {
  return (
    <Canvas camera={{ fov: 20 }} shadows>
      {/* <mesh position={[-0.5, -1.3, 0.5]} scale={0.9}>
        <StudyDesk />
      </mesh> */}
      <VRMAvatar />

      <mesh position={[0, -0.94, 0.5]} scale={0.5} rotation-y={Math.PI}>
        <Room />
      </mesh>
      <CameraControls />
      <Environment background={false} preset={'apartment'} />
    </Canvas>
  )
}

export default VRMCanvas
