import { Center, Text3D } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
function Letters() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * 2.5;
    if (group.current) {
      group.current.position.y = Math.cos(time) * 0.1;
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <Center position={[0, 11, 33]}>
        <Text3D
          curveSegments={8}
          bevelEnabled
          bevelSize={0.02}
          bevelThickness={0.04}
          height={0.01}
          letterSpacing={0.01}
          size={0.15}
          font="/assets/font/Peralta_Regular.json"
        >
          START
          <meshNormalMaterial />
        </Text3D>
      </Center>
      <Center position={[0, 11, -33]}>
        <Text3D
          curveSegments={8}
          bevelEnabled
          bevelSize={0.02}
          bevelThickness={0.04}
          height={0.01}
          letterSpacing={0.01}
          size={0.15}
          font="/assets/font/Peralta_Regular.json"
        >
          FINISH
          <meshNormalMaterial />
        </Text3D>
      </Center>
    </group>
  );
}

export default Letters;
