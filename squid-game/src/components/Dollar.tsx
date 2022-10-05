import { useBox, usePlane } from "@react-three/cannon";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";
function Dollar() {
  const texture = useTexture({ map: "img/dollar1.jpg" });
  const [ref, api] = useBox(
    () => ({
      args: [0.47, 0.001, 0.2],
      position: [1, 11.3, 35],
      type: "Dynamic",
      mass: 1,
    }),
    useRef<THREE.Mesh>(null)
  );
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.47, 0.001, 0.2]} />
      <meshPhongMaterial map={texture.map} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default Dollar;
