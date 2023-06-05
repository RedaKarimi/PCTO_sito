import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/man.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes["support-a"].geometry}
        material={materials["Default.001"]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes["mannequin-a"].geometry}
        material={materials["defaultMat.001"]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
}
useGLTF.preload('/models/man.gltf')