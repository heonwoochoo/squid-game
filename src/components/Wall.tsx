import { useBox } from "@react-three/cannon";
import { useRef } from "react";
import * as THREE from "three";
function Wall() {
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
      position: [0, 10, -41],
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
  return null;
}
export default Wall;
