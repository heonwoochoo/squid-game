import * as THREE from "three";
import { useBox, Triplet } from "@react-three/cannon";
function Glass(props: JSX.IntrinsicElements["mesh"]) {
  const type = props.type;
  console.log("glass");
  const [ref, api] = useBox<THREE.Mesh>(() => ({
    mass: 0.1,
    position: props.position as Triplet,
  }));
  return (
    <mesh ref={ref} {...props}>
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
