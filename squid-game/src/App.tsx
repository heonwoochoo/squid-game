import { Canvas, GroupProps, Vector3 } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useMemo } from "react";
import { Debug, Physics, Triplet } from "@react-three/cannon";
import { motion } from "framer-motion-3d";
import { useRecoilValue } from "recoil";
import * as THREE from "three";
import "./App.css";
import Setting from "./Setting";
import Floor from "./components/Floor";
import Pillar from "./components/Pillar";
import Bar from "./components/Bar";
import Glass from "./components/Glass";
import { PerspectiveCamera, PointerLockControls } from "@react-three/drei";
import { Player } from "./components/Player";
import Model from "./components/Model";

import { deadPosState, deadState } from "./atoms";

export interface IGlass {
  step: number;
  type: "normal" | "strong";
  position: Triplet | undefined;
}

function App() {
  const isDead = useRecoilValue(deadState);
  const deadPosition = useRecoilValue(deadPosState);
  const model = useRef<THREE.Group>(null);
  const glassUnitSize = 3;
  const numberOfGlass = 11;
  const spotLightDistance = 50;
  const spotLightPosition: Vector3[] = [
    [-spotLightDistance, spotLightDistance, spotLightDistance],
    [spotLightDistance, spotLightDistance, spotLightDistance],
    [-spotLightDistance, spotLightDistance, -spotLightDistance],
    [spotLightDistance, spotLightDistance, -spotLightDistance],
  ];
  const barPosition: Triplet[] | undefined = [
    [-4.0, 10.3, 0],
    [-1.0, 10.3, 0],
    [1.0, 10.3, 0],
    [4.0, 10.3, 0],
  ];
  const glasses: IGlass[] = useMemo(() => {
    const arr: IGlass[] = [];
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
        step: 10 - i + 1,
        type: glassTypes[0],
        position: [-2.5, 10.5, i * glassUnitSize * 2 - glassUnitSize * 10],
      };
      const glass2: IGlass = {
        step: 10 - i + 1,
        type: glassTypes[1],
        position: [2.5, 10.5, i * glassUnitSize * 2 - glassUnitSize * 10],
      };
      arr.push(glass1, glass2);
    }
    return arr;
  }, []);

  // 사망했을 때
  if (isDead === true && model.current) {
    model.current.visible = isDead;
    const [x, y, z] = deadPosition.toLocaleString().split(",");
    model.current.position.set(Number(x) - 11.5, 0.5, Number(z) + 2);
  }
  return (
    <div id="canvas-container">
      <Canvas id="canvas" camera={{ fov: 45 }}>
        <Setting />
        <motion.ambientLight
          transition={{ duration: 4 }}
          animate={
            isDead
              ? { color: "rgb(235, 15, 15)" }
              : { color: "rgb(255, 172, 172)" }
          }
          intensity={1}
        />
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
                userData={{
                  name: i.toString(),
                  size: glassUnitSize,
                }}
              />
            ))}
            {glasses.map((glass, i) => (
              <Glass
                key={i}
                position={glass.position}
                userData={{
                  glassType: glass.type,
                  step: glass.step,
                  size: glassUnitSize,
                }}
              />
            ))}
            <Player visible={!isDead} />
            <Model ref={model} />
          </Physics>
        </Suspense>
        <PointerLockControls />
      </Canvas>
    </div>
  );
}
export default App;
