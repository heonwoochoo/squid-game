import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef } from "react";
import { Physics, Triplet } from "@react-three/cannon";
import { useRecoilValue } from "recoil";
import Setting from "./components/Setting";
import Floor from "./components/Floor";
import Pillar from "./components/Pillar";
import Bars from "./components/Bars";
import Glasses from "./components/Glasses";
import { PointerLockControls } from "@react-three/drei";
import Player from "./components/Player";
import Model from "./components/Model";
import { clearState, deadState } from "./atoms";
import Board from "./components/Board";
import Wall from "./components/Wall";
import Dollars from "./components/Dollars";
import DollarCase from "./components/DollarCase";
import * as THREE from "three";
import Loader from "./ui/Loader";
import Retry from "./ui/Retry";
import { Camera } from "three";

export interface IGlass {
  step: number;
  type: "normal" | "strong";
  position: Triplet | undefined;
}

function App() {
  console.log("app 렌더링");
  const isClear = useRecoilValue(clearState);
  const isDead = useRecoilValue(deadState);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
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
            {isClear && <Wall />}
          </Physics>
          <Board />
          <PointerLockControls
            enabled={!isDead}
            onClick={(e: any) => {
              if (isDead) e.target.onUnlock();
            }}
          />
          {!isClear ? <Retry /> : null}
        </Suspense>
      </Canvas>
    </div>
  );
}
export default App;
