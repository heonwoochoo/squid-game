import { useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader, Vector2 } from "three";
import { useBox } from "@react-three/cannon";
function Floor() {
  const [ref, api] = useBox<THREE.Mesh>(() => ({}));
  const texture = useLoader(TextureLoader, "img/floor3.jpg");
  texture.repeat = new THREE.Vector2(4, 4);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  console.log("Floor");
  return (
    <mesh ref={ref} receiveShadow>
      <boxGeometry args={[200, 1, 200]} />
      <meshPhongMaterial map={texture} shininess={1} />
    </mesh>
  );
}

export default Floor;
