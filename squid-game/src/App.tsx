import { Canvas } from "@react-three/fiber";
import React, { PropsWithChildren, Suspense, useEffect, useRef } from "react";
import { Debug, Physics, PhysicsProps, Triplet } from "@react-three/cannon";
import { useRecoilValue } from "recoil";
import "./App.css";
import Setting from "./components/Setting";
import Floor from "./components/Floor";
import Pillar from "./components/Pillar";
import Bars from "./components/Bars";
import Glasses from "./components/Glasses";
import { PointerLockControls, useDetectGPU } from "@react-three/drei";
import Player from "./components/Player";
import Model from "./components/Model";
import { clearState } from "./atoms";
import Board from "./components/Board";
import Wall from "./components/Wall";
import Dollars from "./components/Dollars";
import { PhysicsProviderProps } from "@react-three/cannon/dist/physics-provider";
import MoneyGlass from "./components/MoneyGlass";
import * as THREE from "three";

export interface IGlass {
  step: number;
  type: "normal" | "strong";
  position: Triplet | undefined;
}

function App() {
  console.log("app 렌더링");
  const isClear = useRecoilValue(clearState);
  return (
    <div id="canvas-container">
      <Canvas id="canvas" camera={{ fov: 45 }} dpr={[1, 2]}>
        <Setting />
        <Suspense fallback={null}>
          <Physics gravity={[0, -50, 0]}>
            <Floor />
            <Pillar />
            <Bars />
            <Glasses />
            <Player />
            <Model />
            <Dollars number={200} />
            {isClear && <Wall />}
            <MoneyGlass />
          </Physics>
          <Board />
        </Suspense>
        <PointerLockControls />
      </Canvas>
    </div>
  );
}
export default App;
