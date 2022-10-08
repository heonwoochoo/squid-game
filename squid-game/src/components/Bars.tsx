import { Vector3 } from "@react-three/fiber";
import * as THREE from "three";
import SideLight from "./SideLight";
import { useBox, BoxProps } from "@react-three/cannon";
import React, { useRef, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { unitState } from "../atoms";
const Bars = React.memo(() => {
  console.log("bars");
  const { glassSize } = useRecoilValue(unitState);
  const geo = useMemo(
    () => new THREE.BoxGeometry(0.1, 0.3, glassSize * 22.35),
    []
  );
  const mat = useMemo(
    () => new THREE.MeshPhongMaterial({ color: "#441c1d" }),
    []
  );

  const Lights = useMemo(() => {
    const positions: Vector3[] = [];
    for (let i = 0; i < 40; i++) {
      positions.push([0, 0, i * 1.5 - glassSize * 9]);
    }
    return positions;
  }, []);
  const Bar = React.memo(({ position, userData }: BoxProps) => {
    const [bar, api] = useBox(
      () => ({
        args: [0.1, 0.1, glassSize * 22.35],
        type: "Static",
        position,
      }),
      useRef<THREE.Mesh>(null)
    );
    return (
      <mesh ref={bar} geometry={geo} material={mat} receiveShadow castShadow>
        {Lights.map((pos, i) =>
          userData?.key === 0 || userData?.key === 3 ? (
            <SideLight position={pos} key={i} />
          ) : null
        )}
      </mesh>
    );
  });

  return (
    <group>
      <Bar position={[-4.0, 10.3, 0]} userData={{ key: 0 }} />
      <Bar position={[-1.0, 10.3, 0]} userData={{ key: 1 }} />
      <Bar position={[1.0, 10.3, 0]} userData={{ key: 2 }} />
      <Bar position={[4.0, 10.3, 0]} userData={{ key: 3 }} />
    </group>
  );
});

export default Bars;
