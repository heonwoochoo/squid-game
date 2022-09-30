import { Canvas, Vector3 } from "@react-three/fiber";
import React, { Suspense } from "react";
import "./App.css";
import CameraController from "./CameraController";
import Setting from "./Setting";
import Floor from "./components/Floor";
import Pillar from "./components/Pillar";
import Bar from "./components/Bar";

function App() {
  const glassUnitSize = 1.2;
  const numberOfGlass = 10;
  const barPosition: Vector3[] = [
    [-1.6, 10.3, 0],
    [-0.4, 10.3, 0],
    [0.4, 10.3, 0],
    [1.6, 10.3, 0],
  ];
  return (
    <div id="canvas-container">
      <Canvas id="canvas">
        <Setting />
        <CameraController />
        <ambientLight color="white" intensity={0.7} />
        <Suspense fallback={null}>
          <Floor />
          <Pillar
            position={[0, 5.5, -glassUnitSize * 12 - glassUnitSize / 2]}
          />
          <Pillar position={[0, 5.5, glassUnitSize * 12 + glassUnitSize / 2]} />

          {barPosition.map((position, i) => (
            <Bar key={i} position={position} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
export default App;
