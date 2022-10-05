import { useBox, useSphere } from "@react-three/cannon";
import { useTexture } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRecoilValue } from "recoil";
import { clearState } from "../atoms";
function InstancedSphere({ number = 1000 }) {
  const texture = useTexture({ map: "img/dollar1.jpg" });
  const [ref, api] = useBox(
    (index) => ({
      type: "Dynamic",
      args: [0.47, 0.001, 0.2],
      mass: 1,
      position: [
        (Math.random() - 0.5) * 2,
        Math.random() * 40 + 10,
        -38 + Math.random() * 5,
      ],
      rotation: [Math.random(), Math.random(), Math.random()],
    }),
    useRef<THREE.InstancedMesh>(null)
  );
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, number]}>
      <boxBufferGeometry args={[0.47, 0.001, 0.2]} />
      <meshPhongMaterial map={texture.map} side={THREE.DoubleSide} />
    </instancedMesh>
  );
}

export default InstancedSphere;
