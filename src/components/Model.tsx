import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useRecoilValue } from "recoil";
import { deadPosState, deadState } from "../atoms";

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
    Object_5: THREE.Mesh;
    Object_6: THREE.Mesh;
    Object_7: THREE.Mesh;
    Object_8: THREE.Mesh;
    Object_9: THREE.Mesh;
    Object_10: THREE.Mesh;
    Object_11: THREE.Mesh;
    Object_3: THREE.Mesh;
    Object_4: THREE.Mesh;
  };
  materials: {
    pant: THREE.MeshStandardMaterial;
    Material__26: THREE.MeshStandardMaterial;
    Material__40: THREE.MeshStandardMaterial;
    Material__172: THREE.MeshStandardMaterial;
  };
};

const Model = React.memo(() => {
  const isDead = useRecoilValue(deadState);
  const deadPosition = useRecoilValue(deadPosState);
  const model = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF("./assets/gltf/man_base_mesh.glb") as
    | GLTFResult
    | any;

  // 사망시 시체 위치 조정
  if (isDead === true && model.current) {
    model.current.visible = isDead;
    const [x, _, z] = deadPosition.toLocaleString().split(",");
    model.current.position.set(Number(x) - 11.5, 0.5, Number(z) + 2);
  }
  return (
    <group
      ref={model}
      rotation={[0, Math.PI, 0, "XYZ"]}
      visible={false}
      scale={0.02}
      dispose={null}
    >
      <group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.pant}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials.Material__26}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_6.geometry}
          material={materials.Material__40}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_7.geometry}
          material={materials.Material__40}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_8.geometry}
          material={materials.Material__40}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_9.geometry}
          material={materials.Material__40}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_10.geometry}
          material={materials.Material__40}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_11.geometry}
          material={materials.Material__40}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials.Material__172}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials.Material__172}
        />
      </group>
    </group>
  );
});

useGLTF.preload("models/man_base_mesh.glb");
export default Model;
