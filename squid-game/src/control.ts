import { useState, useEffect } from "react";
import * as THREE from "three";
type KeyType = "KeyW" | "KeyS" | "KeyA" | "KeyD" | "Space";
export const SPEED = 6;
export const keys = {
  KeyW: "forward",
  KeyS: "backward",
  KeyA: "left",
  KeyD: "right",
  Space: "jump",
};
export const moveFieldByKey = (key: KeyType) => keys[key];
export const direction = new THREE.Vector3();
export const frontVector = new THREE.Vector3();
export const sideVector = new THREE.Vector3();
export const rotation = new THREE.Vector3();
export const speed = new THREE.Vector3();

export const usePlayerControls = () => {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  });
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }));
    };
    const handleKeyUp = (e: any) => {
      setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }));
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  return movement;
};
