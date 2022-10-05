import { Triplet, useBox } from "@react-three/cannon";
import { useRef } from "react";
import * as THREE from "three";
import { useMakeWalls } from "../utils";

function Wall() {
  const args: Triplet = [10, 10, 0.1];
  // useBox(
  //   () => ({
  //     type: "Static",
  //     position: [0, 10, -33],
  //     args,
  //   }),
  //   useRef<THREE.Mesh>(null)
  // );
  useMakeWalls();
  useBox(
    () => ({
      type: "Static",
      position: [4, 10, -38],
      rotation: [0, Math.PI / 2, 0],
      args,
    }),
    useRef<THREE.Mesh>(null)
  );
  useBox(
    () => ({
      type: "Static",
      position: [-4, 10, -38],
      rotation: [0, Math.PI / 2, 0],
      args,
    }),
    useRef<THREE.Mesh>(null)
  );
  console.log("벽 생성");
  return null;
}

export default Wall;
