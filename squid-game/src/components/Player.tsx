import * as THREE from "three";
import { useRecoilState } from "recoil";
import { useEffect, useRef, useState } from "react";
import { useSphere } from "@react-three/cannon";
import { useThree, useFrame, MeshProps } from "@react-three/fiber";
import { deadPosState, deadState } from "../atoms";
type KeyType = "KeyW" | "KeyS" | "KeyA" | "KeyD" | "Space";
const SPEED = 5;
const keys = {
  KeyW: "forward",
  KeyS: "backward",
  KeyA: "left",
  KeyD: "right",
  Space: "jump",
};
const moveFieldByKey = (key: KeyType) => keys[key];
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const rotation = new THREE.Vector3();
const speed = new THREE.Vector3();

const usePlayerControls = () => {
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

export const Player = (props: MeshProps) => {
  const [jumping, setJumping] = useState(false);
  const [isDead, setIsDead] = useRecoilState(deadState);
  const [deadPosition, setDeadPosition] = useRecoilState(deadPosState);
  const [ref, api] = useSphere(
    () => ({
      mass: 30,
      type: "Dynamic",
      position: [0, 12, 40],
      args: [1],
      onCollide: (e) => {
        if (e.contact.impactVelocity > 25) {
          console.log("사망");
          setDeadPosition([
            e.contact.contactPoint[0],
            e.contact.contactPoint[1],
            e.contact.contactPoint[2],
          ]);
          setIsDead(true);
        }
        if (e.body.userData?.glassType) {
          console.log(e.body.userData?.glassType, e.body.userData?.step);
        }
      },
      onCollideBegin: () => setJumping(false),
      onCollideEnd: () => setJumping(true),
    }),
    useRef<THREE.Mesh>(null)
  );
  const { forward, backward, left, right, jump } = usePlayerControls();
  const { camera } = useThree();
  const velocity = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
  }, []);
  useFrame((state) => {
    ref.current?.getWorldPosition(camera.position);
    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);
    speed.fromArray(velocity.current);
    api.velocity.set(direction.x, velocity.current[1], direction.z);
    if (jump && !jumping) {
      api.velocity.set(velocity.current[0], 20, velocity.current[2]);
    }
  });
  return (
    <>
      <mesh ref={ref} />
    </>
  );
};
