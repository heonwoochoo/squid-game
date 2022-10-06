import { Box, Sphere, useBounds } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useRecoilValue } from "recoil";
import * as THREE from "three";
import { clearState } from "../atoms";
function DollarCase() {
  const isClear = useRecoilValue(clearState);
  const ref = useRef<THREE.MeshPhysicalMaterial>(null);
  return (
    <Sphere
      visible={isClear}
      args={[2, 16, 16, 0, Math.PI]}
      position={[0, 12, -40]}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <meshPhysicalMaterial
        opacity={0}
        ref={ref}
        roughness={0.1}
        side={THREE.DoubleSide}
        reflectivity={0.7}
        thickness={0.03}
        transmission={1}
      />
    </Sphere>
  );
}
export default DollarCase;
