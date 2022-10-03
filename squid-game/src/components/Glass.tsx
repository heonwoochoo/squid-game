import * as THREE from "three";
import { useBox, BoxProps } from "@react-three/cannon";
import { useRef } from "react";
function Glass(props: BoxProps) {
  const type = props.userData?.glassType;
  const size = props.userData?.size;
  const [glass, api] = useBox(
    () => ({
      mass: type === "normal" ? 0.1 : 100,
      args: [size, 0.05, size],
      type: "Dynamic",
      ...props,
    }),
    useRef<THREE.Mesh>(null)
  );
  return (
    <mesh ref={glass}>
      <boxGeometry args={[size, 0.05, size]} />
      <meshPhongMaterial
        color="#9fdfff"
        transparent={true}
        opacity={type === "normal" ? 0.5 : 0.8}
      />
    </mesh>
  );
}
export default Glass;
