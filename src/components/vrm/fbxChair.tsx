import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { useThree } from 'react-three-fiber'
import { useEffect } from 'react'


export const FBXChair = () => {
    const { scene } = useThree()

    const fbx = useLoader(FBXLoader, 'models/Armchair_003__corona.fbx')
    
    fbx.position.set(0, -250, -100);

    return <primitive object={fbx} />
}