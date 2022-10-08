import { Center, Text, useTexture } from "@react-three/drei";
import { useRef } from "react";
import { useRecoilValue } from "recoil";
import * as THREE from "three";
import { clearState, clearTimeState, stepState } from "../atoms";

// Geometry
const pillarGeo = new THREE.CylinderGeometry(1, 1, 20, 16);
const floorGeo = new THREE.BoxGeometry(10, 0.3, 10);
const boardGeo = new THREE.BoxGeometry(3, 15, 30);

// Material
// 바닥, 기둥
const material = new THREE.MeshPhongMaterial({ color: "#2c3e50" });

// 전광판

function Board() {
  const message1 = "Welcome to squid game";
  const message2 = "believe in yourself";
  const currentStep = useRecoilValue(stepState);
  const isClear = useRecoilValue(clearState);
  const clearTime = useRecoilValue(clearTimeState);
  const center = useRef<THREE.Group>(null);
  if (clearTime) console.log(clearTime.toFixed(1));

  const texture = useTexture("/assets/img/frontman3.jpg", () => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  });
  const material2 = material.clone();
  material2.map = texture;
  return (
    <group
      position-x={-20}
      position-z={-50}
      rotation={[0, -1, 0, "XYZ"]}
      castShadow
      receiveShadow
    >
      <mesh material={material} geometry={pillarGeo} position={[0, 10, 0]} />
      <mesh position={[0, 1, 0]} geometry={floorGeo} material={material} />
      <mesh position={[0, 20, 0]} geometry={boardGeo} material={material2}>
        <Center
          visible={!isClear}
          ref={center}
          rotation={[0, Math.PI / 2, 0]}
          position={[1.6, 5, 0]}
        >
          <Text
            color={"white"}
            fontSize={1.5}
            lineHeight={1}
            letterSpacing={0.1}
          >
            {message1}
          </Text>
        </Center>
        <Center
          visible={!isClear}
          ref={center}
          rotation={[0, Math.PI / 2, 0]}
          position={[1.6, -5, 0]}
        >
          <Text
            color={"white"}
            fontSize={1.5}
            lineHeight={1}
            letterSpacing={0.1}
          >
            {message2}
          </Text>
        </Center>
        <Center position={[1.6, 1, 0]} rotation={[0, Math.PI / 2, 0]}>
          <Text lineHeight={1.0} letterSpacing={0.1} fontSize={3}>
            {isClear
              ? `Finish!`
              : currentStep < 1
              ? `Are you ready?`
              : `step: ${currentStep}`}
          </Text>
        </Center>
        <Center
          visible={isClear}
          position={[1.6, -2, 0]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <Text lineHeight={1.0} letterSpacing={0.1} fontSize={1}>
            {` ${clearTime.toFixed(1)} sec`}
          </Text>
        </Center>
      </mesh>
    </group>
  );
}

export default Board;
