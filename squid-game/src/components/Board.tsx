import { Center, Text3D } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useRecoilValue } from "recoil";
import * as THREE from "three";
import { clearState, stepState } from "../atoms";

// Geometry
const pillarGeo = new THREE.CylinderGeometry(1, 1, 20, 16);
const floorGeo = new THREE.BoxGeometry(10, 0.3, 10);
const boardGeo = new THREE.BoxGeometry(3, 15, 30);

// Material
// 바닥, 기둥
const material = new THREE.MeshPhongMaterial({ color: "#2c3e50" });

// 전광판
const material2 = material.clone();
material2.color.set(new THREE.Color("#21262e"));

// 텍스트
const material3 = material.clone();
material3.color.set(new THREE.Color("white"));

function Board() {
  const message1 = "Welcome to squid game";
  const message2 = "believe in yourself";
  const currentStep = useRecoilValue(stepState);
  const isClear = useRecoilValue(clearState);
  const center = useRef<THREE.Group>(null);
  return (
    <group position-x={-30} position-z={0} castShadow receiveShadow>
      <mesh
        name="기둥"
        material={material}
        geometry={pillarGeo}
        position={[0, 10, 0]}
      />
      <mesh
        name="바닥"
        position={[0, 1, 0]}
        geometry={floorGeo}
        material={material}
      />
      <mesh
        name="전광판"
        position={[0, 20, 0]}
        geometry={boardGeo}
        material={material2}
      >
        <Center
          visible={!isClear}
          ref={center}
          rotation={[0, Math.PI / 2, 0]}
          position={[1.5, 4, 0]}
        >
          <Text3D
            height={0.2}
            lineHeight={1.0}
            letterSpacing={0.2}
            size={1}
            font="./font/inter.json"
            material={material3}
          >
            {message1}
          </Text3D>
        </Center>
        <Center
          visible={!isClear}
          ref={center}
          rotation={[0, Math.PI / 2, 0]}
          position={[1.5, -5, 0]}
        >
          <Text3D
            height={0.2}
            lineHeight={1.0}
            letterSpacing={0.2}
            size={1}
            font="./font/inter.json"
            material={material3}
          >
            {message2}
          </Text3D>
        </Center>
        <Center position={[1.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <Text3D
            height={0.2}
            lineHeight={1.0}
            letterSpacing={0.2}
            size={2}
            font="./font/inter.json"
            material={material3}
          >
            {isClear ? `Congratulations !` : `step: ${currentStep}`}
          </Text3D>
        </Center>
      </mesh>
    </group>
  );
}

export default Board;
