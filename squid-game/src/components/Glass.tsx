import * as THREE from "three";
import { useBox, Triplet, BoxProps } from "@react-three/cannon";
import { useRef } from "react";
function Glass(props: BoxProps) {
  const type = props.userData?.glassType;
  const [glass] = useBox(
    () => ({
      mass: type === "normal" ? 0.1 : 20,
      args: [1.2, 0.05, 1.2],
      type: "Dynamic",
      ...props,
    }),
    useRef<THREE.Mesh>(null)
  );
  const clickedGlass = () => {
    console.log(props.userData?.glassType, props.userData?.step);
  };
  return (
    <mesh onClick={clickedGlass} ref={glass}>
      <boxGeometry args={[1.2, 0.05, 1.2]} />
      <meshPhongMaterial
        color="#9fdfff"
        transparent={true}
        opacity={type === "normal" ? 0.3 : 1}
      />
    </mesh>
  );
}
export default Glass;
