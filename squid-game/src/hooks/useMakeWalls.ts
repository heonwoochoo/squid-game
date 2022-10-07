import { Physics, useBox } from "@react-three/cannon";
import { useRef } from "react";
import { useRecoilValue } from "recoil";
import * as THREE from "three";
import { clearState } from "../atoms";

const useMakeWalls = () => {
  const isClear = useRecoilValue(clearState);
  useBox(() => {
    if (isClear)
      return {
        type: "Static",
        position: [0, 10, -33],
        args: [10, 10, 0.1],
      };
    else return {};
  }, useRef<THREE.Mesh>(null));
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
