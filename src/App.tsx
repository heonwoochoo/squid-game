import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef } from "react";
import { Debug, Physics, Triplet } from "@react-three/cannon";
import { useRecoilState, useRecoilValue } from "recoil";
import Setting from "./components/Setting";
import Floor from "./components/Floor";
import Pillar from "./components/Pillar";
import Bars from "./components/Bars";
import Glasses from "./components/Glasses";
import { PointerLockControls } from "@react-three/drei";
import Player from "./components/Player";
import Model from "./components/Model";
import { clearState, deadState, pointerLockState } from "./atoms";
import Board from "./components/Board";
import Wall from "./components/Wall";
import Dollars from "./components/Dollars";
import DollarCase from "./components/DollarCase";
import * as THREE from "three";
import Loader from "./ui/Loader";
import Retry from "./ui/Retry";
import { PointerLockControls as PointerLockControlsImpl } from "three-stdlib";
import Doll from "./components/Doll";
import { backgroungMusic } from "./utils/sounds";
import VolumeSwitch from "./ui/VolumeSwitch";
import Letters from "./components/Letters";
import LifeIcons from "./components/LifeIcons";
export interface IGlass {
  step: number;
  type: "normal" | "strong";
  position: Triplet | undefined;
}
backgroungMusic.stop();
backgroungMusic.play();

function App() {
  const [isLock, setIsLock] = useRecoilState(pointerLockState);
  const isClear = useRecoilValue(clearState);
  const isDead = useRecoilValue(deadState);
  const pointer = useRef<PointerLockControlsImpl>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (pointer.current)
      isDead ? pointer.current.unlock() : pointer.current.lock();
  }, [isDead]);
  const handlePointerUnlock = () => {
    setIsLock(true);
  };
  const handlePointerLock = () => {
    setIsLock(false);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        shadows={true}
        ref={canvas}
        style={{ width: "100%", height: "100%" }}
        camera={{ fov: 45 }}
        dpr={[1, 2]}
      >
        <Setting />
        <Suspense fallback={<Loader />}>
          <Physics gravity={[0, -50, 0]}>
            <Floor />
            <Pillar />
            <Bars />
            <Glasses />
            <Player />
            <Model />
            <Dollars number={100} />
            <DollarCase />
            <Debug color="black" scale={1.1}>
              {isClear && <Wall />}
            </Debug>
            <Doll position={[17, 1, 0]} scale={7} />
          </Physics>
          <Board />
          <Letters />
          <LifeIcons />
          <PointerLockControls
            ref={pointer}
            onLock={handlePointerLock}
            onUnlock={handlePointerUnlock}
          />
          <Retry />
          {isLock && <VolumeSwitch />}
        </Suspense>
      </Canvas>
    </div>
  );
}
export default App;
