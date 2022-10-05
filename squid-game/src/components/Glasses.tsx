import * as THREE from "three";
import { useBox } from "@react-three/cannon";
import React, { useRef, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { unitState } from "../atoms";

interface IMesh {
  userData: { [key: string]: any };
}

function Glasses() {
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

  const glassesData = useMemo<IMesh[]>(() => {
    const arr = [];
    for (let i = 0; i < glassNumber; i++) {
      const pattern = Math.round(Math.random());
      const glassRight: IMesh = {
        userData: {
          type: pattern === 0 ? "normal" : "strong",
          step: 10 - i + 1,
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
      {glassesData.map((glass, i) => (
        <Memoization key={i} userData={glass.userData} />
      ))}
    </group>
  );
}
export default Glasses;
