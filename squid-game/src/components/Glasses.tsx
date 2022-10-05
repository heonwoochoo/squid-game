import * as THREE from "three";
import { useBox, BoxProps, Triplet } from "@react-three/cannon";
import { Vector3 } from "@react-three/fiber";
import React, { useRef, useMemo } from "react";
import { IGlass } from "../App";
import { useRecoilValue } from "recoil";
import { unitState } from "../atoms";
function Glasses(props: BoxProps) {
  const { glassSize, glassNumber } = useRecoilValue(unitState);
  const geometry = useMemo(
    () => new THREE.BoxGeometry(glassSize, 0.1, glassSize),
    []
  );
  const normalMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "white",
        transmission: 1,
        roughness: 0.4,
      }),
    []
  );
  const strongMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "white",
        transmission: 1,
        roughness: 0.6,
      }),
    []
  );
  interface IMesh {
    userData: { [key: string]: any };
  }
  const meshes = useMemo<IMesh[]>(() => {
    const arr = [];
    for (let i = 0; i < glassNumber; i++) {
      const pattern = Math.round(Math.random());
      const glassRight: IMesh = {
        userData: {
          type: pattern === 0 ? "normal" : "strong",
          step: 10 - i + 1,
          size: glassSize,
          geo: geometry,
          mat: pattern === 0 ? normalMaterial : strongMaterial,
          pos: [-2.5, 10.5, i * glassSize * 2 - glassSize * 10],
        },
      };

      const glassLeft: IMesh = {
        userData: {
          type: pattern === 0 ? "strong" : "normal",
          step: 10 - i + 1,
          pos: [2.5, 10.5, i * glassSize * 2 - glassSize * 10],
        },
      };
      arr.push(glassRight, glassLeft);
    }
    return arr;
  }, []);
  function Glass({ userData }: JSX.IntrinsicElements["mesh"]) {
    const type = userData?.type;
    const [ref] = useBox(
      () => ({
        args: [glassSize, 0.1, glassSize],
        position: userData?.pos,
        userData: {
          glassType: type,
          step: userData?.step,
        },
        type: "Dynamic",
        mass: type === "normal" ? 1 : 100,
      }),
      useRef<THREE.Mesh>(null)
    );
    return (
      <mesh
        ref={ref}
        geometry={geometry}
        material={type === "normal" ? normalMaterial : strongMaterial}
      ></mesh>
    );
  }
  const Memoization = React.memo(Glass);
  console.log("유리가 만들어졌습니다.");
  return (
    <group>
      {meshes.map((mesh, i) => (
        <Memoization key={i} userData={mesh.userData} />
      ))}
    </group>
  );
}
export default Glasses;
