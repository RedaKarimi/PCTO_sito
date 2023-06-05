import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/woman.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
        <mesh
          name="Mannequin002"
          geometry={nodes.Mannequin002.geometry}
          material={materials.mannequin}
          position={[-2.54, -1.82, -8.95]}
          scale={1}
        />
    </group>
  );
}

useGLTF.preload("/models/woman.gltf");
