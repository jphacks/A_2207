/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { VRMAvatar } from './vrmAvatar'

const VRMCanvas = () => {
  return (
    <Canvas camera={{ fov: 20 }}>
      <spotLight position={[0, 50, 50]} />
      <VRMAvatar />
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </Canvas>
  )
}

export default VRMCanvas
