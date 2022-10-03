import { Center, Text3D } from "@react-three/drei";
import { useRef } from "react";
import { useRecoilValue } from "recoil";
import * as THREE from "three";
import { clearState, stepState } from "../atoms";
function Board() {
  const message1 = "Welcome to squid game";
  const message2 = "believe in yourself";
  const currentStep = useRecoilValue(stepState);
  const isClear = useRecoilValue(clearState);
  const center = useRef<THREE.Group>(null);
  console.log(center);
  return (
    <>
      <group position-x={-30} position-z={0} castShadow receiveShadow>
        <mesh name="기둥" position={[0, 10, 0]}>
          <cylinderGeometry args={[1, 1, 20, 16]} />
          <meshPhongMaterial color="#2c3e50" />
        </mesh>
        <mesh name="바닥" position={[0, 1, 0]}>
          <boxGeometry args={[10, 0.3, 10]} />
          <meshPhongMaterial color="#2c3e50" />
        </mesh>
        <mesh name="전광판" position={[0, 20, 0]}>
          <boxGeometry args={[3, 15, 30]} />
          <meshPhongMaterial color="#21262e" />
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
            >
              {message1}
              <meshPhongMaterial />
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
            >
              {message2}
              <meshPhongMaterial />
            </Text3D>
          </Center>
          <Center position={[1.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <Text3D
              height={0.2}
              lineHeight={1.0}
              letterSpacing={0.2}
              size={2}
              font="./font/inter.json"
            >
              {isClear ? `Congratulations !` : `step: ${currentStep}`}
              <meshPhongMaterial />
            </Text3D>
          </Center>
        </mesh>
      </group>
    </>
  );
}

export default Board;
