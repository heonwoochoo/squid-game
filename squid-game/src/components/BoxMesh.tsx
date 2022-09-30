import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function BoxMesh(props: JSX.IntrinsicElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    ref.current!.rotation.x += 0.01;
  });
  return (
    <mesh {...props} ref={ref}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}

export default BoxMesh;
