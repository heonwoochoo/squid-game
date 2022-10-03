import { Vector3 } from "@react-three/fiber";
import * as THREE from "three";
import SideLight from "./SideLight";
import { useBox, BoxProps } from "@react-three/cannon";
import { useRef } from "react";
function Bar(props: BoxProps) {
  const sideLights: { position: Vector3 }[] = [];
  const size = props.userData?.size;
  for (let i = 0; i < 40; i++) {
    sideLights.push({ position: [0, 0, i * 1.5 - size * 9] });
  }
  const [bar, api] = useBox(
    () => ({
      args: [0.1, 0.1, size * 22.35],
      type: "Static",
      ...props,
    }),
    useRef<THREE.Mesh>(null)
  );
  return (
    <mesh ref={bar} receiveShadow castShadow>
      <boxGeometry args={[0.1, 0.3, size * 22.35]} />
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
