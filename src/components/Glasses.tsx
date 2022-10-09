import * as THREE from "three";
import { useBox } from "@react-three/cannon";
import React, { useRef, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { unitState } from "../atoms";

interface IMesh {
  userData: { [key: string]: any };
}

const Glasses = React.memo(() => {
  const { glassSize, glassNumber } = useRecoilValue(unitState);
  const geometry = useMemo(
    () => new THREE.BoxGeometry(glassSize, 0.1, glassSize),
    [glassSize]
  );
  const normalMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "white",
        transmission: 1,
        roughness: 0.3,
        clearcoat: 0.5,
        reflectivity: 0.5,
      }),
    []
  );
  const strongMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "white",
        transmission: 1,
        roughness: 0.4,
        clearcoat: 0.5,
        reflectivity: 0.5,
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
  }, [glassNumber, glassSize]);
  const Glass = React.memo(({ userData }: JSX.IntrinsicElements["mesh"]) => {
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
        mass: type === "normal" ? 1 : 200,
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
  });
  return (
    <group>
      {glassesData.map((glass, i) => (
        <Glass key={i} userData={glass.userData} />
      ))}
    </group>
  );
});
export default Glasses;
