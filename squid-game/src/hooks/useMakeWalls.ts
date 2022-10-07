import { useBox } from "@react-three/cannon";
import { useRef } from "react";
import * as THREE from "three";

/**
 * 클리어시 유저가 못떨어지게 투명한 벽 생성
 */
const useMakeWalls = () => {
  useBox(
    () => ({
      type: "Static",
      position: [0, 10, -33],
      args: [10, 10, 0.1],
    }),
    useRef<THREE.Mesh>(null)
  );
  useBox(
    () => ({
      type: "Static",
      position: [4, 10, -38],
      rotation: [0, Math.PI / 2, 0],
      args: [10, 10, 0.1],
    }),
    useRef<THREE.Mesh>(null)
  );
  useBox(
    () => ({
      type: "Static",
      position: [-4, 10, -38],
      rotation: [0, Math.PI / 2, 0],
      args: [10, 10, 0.1],
    }),
    useRef<THREE.Mesh>(null)
  );
};

export default useMakeWalls;
