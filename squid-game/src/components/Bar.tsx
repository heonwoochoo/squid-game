import { Vector3 } from "@react-three/fiber";
import * as THREE from "three";
import SideLight from "./SideLight";
import { useBox, Triplet, BoxProps } from "@react-three/cannon";
import { useRef } from "react";
function Bar(props: BoxProps) {
  const sideLights: { position: Vector3 }[] = [];
  for (let i = 0; i < 49; i++) {
    sideLights.push({ position: [0, 0, i * 0.5 - 1.2 * 10] });
  }
  const [bar, api] = useBox(
    () => ({
      args: [0.1, 0.3, 1.2 * 21],
      type: "Static",
      ...props,
    }),
    useRef<THREE.Mesh>(null)
  );
  return (
    <mesh ref={bar} receiveShadow castShadow>
      <boxGeometry args={[0.1, 0.3, 1.2 * 21]} />
      <meshPhongMaterial color="#441c1d" />
      {props.userData?.name === "0" || props.userData?.name === "3"
        ? sideLights.map((sideLight, i) => (
            <SideLight key={i} position={sideLight.position} />
          ))
        : null}
    </mesh>
  );
}

export default Bar;
