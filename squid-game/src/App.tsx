import { Canvas, Vector3 } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef } from "react";
import { Debug, Physics, Triplet } from "@react-three/cannon";
import * as THREE from "three";
import "./App.css";
import Setting from "./Setting";
import Floor from "./components/Floor";
import Pillar from "./components/Pillar";
import Bar from "./components/Bar";
import Glass from "./components/Glass";
import { PointerLockControls } from "@react-three/drei";
import { Player } from "./components/Player";

export interface IGlass {
  step: number;
  type: "normal" | "strong";
  position: Triplet | undefined;
}

function App() {
  const glassUnitSize = 1.2;
  const numberOfGlass = 10;
  const spotLightDistance = 50;
  const spotLightPosition: Vector3[] = [
    [-spotLightDistance, spotLightDistance, spotLightDistance],
    [spotLightDistance, spotLightDistance, spotLightDistance],
    [-spotLightDistance, spotLightDistance, -spotLightDistance],
    [spotLightDistance, spotLightDistance, -spotLightDistance],
  ];
  const barPosition: Triplet[] | undefined = [
    [-1.6, 10.3, 0],
    [-0.4, 10.3, 0],
    [0.4, 10.3, 0],
    [1.6, 10.3, 0],
  ];
  const glasses = [];
  for (let i = 0; i < numberOfGlass; i++) {
    const glassTypeNumber = Math.round(Math.random());
    let glassTypes: IGlass["type"][] = [];
    switch (glassTypeNumber) {
      case 0:
        glassTypes = ["normal", "strong"];
        break;
      case 1:
        glassTypes = ["strong", "normal"];
        break;
    }
    const glass1: IGlass = {
      step: 9 - i + 1,
      type: glassTypes[0],
      position: [-1, 10.5, i * glassUnitSize * 2 - glassUnitSize * 9],
    };
    const glass2: IGlass = {
      step: 9 - i + 1,
      type: glassTypes[1],
      position: [1, 10.5, i * glassUnitSize * 2 - glassUnitSize * 9],
    };
    glasses.push(glass1, glass2);
  }
  return (
    <div id="canvas-container">
      <Canvas id="canvas" camera={{ fov: 45 }}>
        <Setting />
        <ambientLight color="#ffe9ac" intensity={0.7} />
        {spotLightPosition.map((position, i) => (
          <spotLight
            intensity={1}
            color="#ffe9ac"
            position={position}
            key={i}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
        ))}
        <Suspense fallback={null}>
          <Physics gravity={[0, -50, 0]}>
            <Floor />
            <Pillar
              position={[0, 5.5, -glassUnitSize * 12 - glassUnitSize / 2]}
            />
            <Pillar
              position={[0, 5.5, glassUnitSize * 12 + glassUnitSize / 2]}
            />
            {barPosition.map((position, i) => (
              <Bar
                key={i}
                position={position}
                userData={{ name: i.toString() }}
              />
            ))}
            {glasses.map((glass, i) => (
              <Glass
                key={i}
                position={glass.position}
                userData={{ glassType: glass.type, step: glass.step }}
              />
            ))}
            {/* <Model
              userData={{ glassPosition: glasses, position: [0, 15, 13] }}
            /> */}
            <Player />
          </Physics>
        </Suspense>
        <PointerLockControls />
      </Canvas>
    </div>
  );
}
export default App;
