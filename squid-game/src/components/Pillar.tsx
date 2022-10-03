import { useBox, BoxProps } from "@react-three/cannon";
import * as THREE from "three";
import { useRef } from "react";
function Pillar(props: BoxProps) {
  const [pillar, api] = useBox(
    () => ({
      args: [8, 10, 8],
      type: "Static",
      ...props,
    }),
    useRef<THREE.Mesh>(null)
  );
  return (
    <mesh ref={pillar} receiveShadow castShadow>
      <meshPhongMaterial color="#071d28" />
      <boxGeometry args={[8, 10, 8]} />
    </mesh>
  );
}

export default Pillar;
