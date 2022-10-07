import * as THREE from "three";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { CollideEvent, Triplet, useSphere } from "@react-three/cannon";
import { useFrame, MeshProps, useThree, Vector3 } from "@react-three/fiber";
import {
  clearState,
  clearTimeState,
  deadPosState,
  deadState,
  respawnCountState,
  stepState,
} from "../atoms";
import {
  usePlayerControls,
  frontVector,
  sideVector,
  direction,
  SPEED,
  speed,
} from "../utils/control";
import {
  contactNormalGlass,
  contactStrongGlass,
  deathScream,
  finishClap,
} from "../utils/sounds";

const Player = React.memo((props: MeshProps) => {
  const [isClear, setIsClear] = useRecoilState(clearState);
  const [jumping, setJumping] = useState(false);
  const [isDead, setIsDead] = useRecoilState(deadState);
  const [deadPosition, setDeadPosition] = useRecoilState(deadPosState);
  const setCurrentStep = useSetRecoilState(stepState);
  const [clearTime, setClearTime] = useRecoilState(clearTimeState);
  const respawnCount = useRecoilValue(respawnCountState);
  const { camera } = useThree();
  const handleCollide = useCallback((e: CollideEvent) => {
    const type = e.body.userData?.glassType;
    const step = e.body.userData?.step;
    const impactVelocity = e.contact.impactVelocity;
    const contactPosition: Vector3 = [
      e.contact.contactPoint[0],
      e.contact.contactPoint[1],
      e.contact.contactPoint[2],
    ];
    console.log(impactVelocity);

    // 착지 속도에 따라 사망 판정
    if (impactVelocity > 25) {
      console.log("사망");
      deathScream.play();
      setDeadPosition(contactPosition);
      setIsDead(true);
    }
    // 착지한 유리 타입,스텝 확인
    if (type) {
      setCurrentStep(step);
      if (impactVelocity > 15) {
        type === "normal"
          ? contactNormalGlass.play()
          : contactStrongGlass.play();
      }
    }
    // 클리어 판정 -> 반대편 포인트에 착지했을 경우
    if (e.contact.bj.userData.point === "end" && !isClear) {
      const event = setTimeout(() => {
        setIsClear(true);
        finishClap.play();
        clearTimeout(event);
      }, 500);
    }
  }, []);
  const [ref, api] = useSphere(
    () => ({
      mass: 30,
      type: "Dynamic",
      position: [0, 12, 40], // 리스폰 위치
      args: [1],
      onCollide: handleCollide,
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
  useEffect(() => {
    api.position.set(0, 12, 40); // 부활시 위치 유저 위치 초기화
    camera.lookAt(0, 12, -40);
  }, [respawnCount]);
  const pos = useMemo(
    () =>
      deadPosition
        .toLocaleString()
        .split(",")
        .map((v) => Number(v)),
    [deadPosition]
  );
  useFrame(({ camera, clock }) => {
    if (isClear && !clearTime) {
      setClearTime(clock.getElapsedTime());
    }
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
    if (jump && !jumping && !isClear) {
      api.velocity.set(velocity.current[0], 20, velocity.current[2]);
    }
  });
  return <mesh ref={ref} {...props} visible={!isDead} />;
});
export default Player;
