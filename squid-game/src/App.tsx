import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { Debug, Physics, Triplet } from "@react-three/cannon";
import { useRecoilValue } from "recoil";
import "./App.css";
import Setting from "./components/Setting";
import Floor from "./components/Floor";
import Pillar from "./components/Pillar";
import Bars from "./components/Bars";
import Glasses from "./components/Glasses";
import { PointerLockControls } from "@react-three/drei";
import { Player } from "./components/Player";
import Model from "./components/Model";
import { clearState } from "./atoms";
import Board from "./components/Board";
import Wall from "./components/Wall";
import Dollars from "./components/Dollars";

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
      <Canvas id="canvas" camera={{ fov: 45 }}>
        <Setting />
        <Suspense fallback={null}>
          <Physics gravity={isClear ? [0, -3, 0] : [0, -50, 0]}>
            <Floor />
            <Pillar />
            <Bars />
            <Glasses />
            <Player />
            <Model />
            {isClear && <Wall />}
            {isClear && <Dollars number={100} />}
          </Physics>
          <Board />
        </Suspense>
        <PointerLockControls />
      </Canvas>
    </div>
  );
}
export default App;
