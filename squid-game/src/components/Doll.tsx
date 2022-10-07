import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Body_Material001_0: THREE.Mesh;
    BowTie_Material001_0: THREE.Mesh;
    DollHead_Material001_0: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};

function Doll(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("assets/gltf/squid_game_doll.glb") as
    | GLTFResult
    | any;
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0, 1.18, -0.03]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Body_Material001_0.geometry}
              material={materials["Material.001"]}
            />
          </group>
          <group position={[0, 1.99, 0.03]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.BowTie_Material001_0.geometry}
              material={materials["Material.001"]}
            />
          </group>
          <group position={[0, 2.03, -0.08]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.DollHead_Material001_0.geometry}
              material={materials["Material.001"]}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

export default Doll;

useGLTF.preload("assets/gltf/squid_game_doll.glb");
