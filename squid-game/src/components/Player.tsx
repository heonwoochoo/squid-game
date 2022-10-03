import * as THREE from "three";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSphere } from "@react-three/cannon";
import { useThree, useFrame, MeshProps } from "@react-three/fiber";
import { deadPosState, deadState, stepState } from "../atoms";
import {
  usePlayerControls,
  frontVector,
  sideVector,
  direction,
  SPEED,
  speed,
} from "../control";
export const Player = (props: MeshProps) => {
  const [jumping, setJumping] = useState(false);
  const [isDead, setIsDead] = useRecoilState(deadState);
  const [deadPosition, setDeadPosition] = useRecoilState(deadPosState);
  const setCurrentStep = useSetRecoilState(stepState);
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
        if (e.body.userData?.glassType) setCurrentStep(e.body.userData?.step);
        if (e.contact.bj.userData.point === "end") {
          console.log("끝");
        }
      },
      onCollideBegin: () => setJumping(false),
      onCollideEnd: () => setJumping(true),
    }),
    useRef<THREE.Mesh>(null)
  );
  const { forward, backward, left, right, jump } = usePlayerControls();
  const velocity = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
  }, []);
  const pos = useMemo(
    () =>
      deadPosition
        .toLocaleString()
        .split(",")
        .map((v) => Number(v)),
    [deadPosition]
  );
  useFrame(({ camera, clock }) => {
    if (isDead) {
      // 사망 시 카메라 설정
      const time = clock.getElapsedTime() * 0.1;
      const posY = time * 10 < 20 ? time * 10 : 20;
      camera.position.set(
        pos[0] + Math.sin(time) * pos[0] * 3,
        posY,
        pos[2] + Math.cos(time) * pos[2]
      );
      camera.lookAt(pos[0], pos[1], pos[2]);
      return;
    }
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
      <mesh ref={ref} {...props} />
    </>
  );
};
