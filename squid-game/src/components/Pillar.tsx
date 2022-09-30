import { useBox, Triplet } from "@react-three/cannon";
import { Vector3 } from "@react-three/fiber";
import * as THREE from "three";

function Pillar(props: JSX.IntrinsicElements["mesh"]) {
  const [ref, api] = useBox<THREE.Mesh>(() => ({
    position: props.position as Triplet,
  }));
  console.log(ref, api);
  return (
    <mesh ref={ref} {...props} receiveShadow castShadow>
      <meshPhongMaterial color="#071d28" />
      <boxGeometry args={[5, 10, 5]} />
    </mesh>
  );
}

export default Pillar;
