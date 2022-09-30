import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.SkinnedMesh;
    Bone: THREE.Bone;
    Bone003: THREE.Bone;
    Bone005: THREE.Bone;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
  };
};

type ActionName = "default" | "fall" | "jump";
type GLTFActions = Record<ActionName, THREE.AnimationAction> | any;

function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF("models/ilbuni.glb") as
    | GLTFResult
    | any;
  const { actions } = useAnimations<GLTFActions>(animations, group);
  useEffect(() => {
    actions.default?.stop();
    actions.default?.play();
  }, []);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" position={[0, 10.9, 13]} scale={0.33}>
          <primitive object={nodes.Bone} />
          <primitive object={nodes.Bone003} />
          <primitive object={nodes.Bone005} />
          <skinnedMesh
            name="Cube"
            geometry={nodes.Cube.geometry}
            material={materials.Material}
            skeleton={nodes.Cube.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("models/ilbuni.glb");
export default Model;
