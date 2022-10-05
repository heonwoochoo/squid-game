import { Canvas } from "@react-three/fiber";
import React, { Suspense, useRef, useMemo } from "react";
import { Debug, Physics, Triplet } from "@react-three/cannon";
import { useRecoilValue } from "recoil";
import * as THREE from "three";
import "./App.css";
import Setting from "./components/Setting";
import Floor from "./components/Floor";
import Pillar from "./components/Pillar";
import Bar from "./components/Bar";
import Glasses from "./components/Glasses";
import { PointerLockControls } from "@react-three/drei";
import { Player } from "./components/Player";
import Model from "./components/Model";
import { clearState, deadPosState, deadState, unitState } from "./atoms";
import Board from "./components/Board";
import Wall from "./components/Wall";
import Dollar from "./components/Dollar";

export interface IGlass {
  step: number;
  type: "normal" | "strong";
  position: Triplet | undefined;
}

function App() {
  console.log("app 렌더링");
  const isDead = useRecoilValue(deadState);
  const deadPosition = useRecoilValue(deadPosState);
  const isClear = useRecoilValue(clearState);
  const model = useRef<THREE.Group>(null);
  const glassUnitSize = 3;
  const barPosition: Triplet[] | undefined = [
    [-4.0, 10.3, 0],
    [-1.0, 10.3, 0],
    [1.0, 10.3, 0],
    [4.0, 10.3, 0],
  ];
  // 사망
  if (isDead === true && model.current) {
    model.current.visible = isDead;
    const [x, y, z] = deadPosition.toLocaleString().split(",");
    model.current.position.set(Number(x) - 11.5, 0.5, Number(z) + 2);
  }
  return (
    <div id="canvas-container">
      <Canvas id="canvas" camera={{ fov: 45 }}>
        <Setting />
        <Suspense fallback={null}>
          <Physics gravity={[0, -50, 0]}>
            <Floor />
            <Pillar />
            {barPosition.map((position, i) => (
              <Bar
                key={i}
                position={position}
                userData={{
                  name: i.toString(),
                  size: glassUnitSize,
                }}
              />
            ))}
            <Glasses />
            <Player visible={!isDead} />
            <Model ref={model} />
            {isClear && <Wall />}
            <Dollar />
          </Physics>
          <Board />
        </Suspense>
        <PointerLockControls />
      </Canvas>
    </div>
  );
}
export default App;
