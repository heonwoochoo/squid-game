import { Vector3 } from "@react-three/fiber";
import * as THREE from "three";
import SideLight from "./SideLight";
import { useBox, BoxProps } from "@react-three/cannon";
import { useRef } from "react";
function Bar(props: BoxProps) {
  const size = props.userData?.size;
  const [bar, api] = useBox(
    () => ({
      args: [0.1, 0.1, size * 22.35],
      type: "Static",
      ...props,
    }),
    useRef<THREE.Mesh>(null)
  );
  return (
    <group dispose={null}>
      <mesh ref={bar} receiveShadow castShadow>
        <boxGeometry args={[0.1, 0.3, size * 22.35]} />
        <meshPhongMaterial color="#441c1d" />
        {props.userData?.name === "1" || props.userData?.name === "3" ? (
          <SideLight />
        ) : null}
      </mesh>
    </group>
  );
}

export default Bar;
