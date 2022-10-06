import { useBox, useSphere } from "@react-three/cannon";
import { useTexture } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useRecoilValue } from "recoil";
import * as THREE from "three";
import { clearState } from "../atoms";
function Dollars({ number = 10 }) {
  console.log("dollars");
  const texture = useTexture({ map: "img/dollar1.jpg" });
  const isClear = useRecoilValue(clearState);
  const [ref, api] = useBox(
    (index) => ({
      type: "Static",
      args: [0.47, 0.001, 0.2],
      position: [
        (Math.random() - 0.5) * 2,
        12 - Math.random(),
        -40 + (Math.random() - 0.5) * 2,
      ],
      rotation: [Math.random(), Math.random(), Math.random()],
    }),
    useRef<THREE.InstancedMesh>(null)
  );
  return (
    <instancedMesh
      visible={isClear}
      ref={ref}
      args={[undefined, undefined, number]}
    >
      <boxGeometry args={[0.47, 0.001, 0.2]} />
      <meshPhongMaterial map={texture.map} side={THREE.DoubleSide} />
    </instancedMesh>
  );
}

export default Dollars;
