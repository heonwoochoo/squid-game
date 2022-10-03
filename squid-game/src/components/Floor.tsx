import { useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader, Vector2 } from "three";
import { BoxProps, useBox } from "@react-three/cannon";
import { useRef } from "react";
function Floor(props: BoxProps) {
  const [ref, api] = useBox(
    () => ({
      args: [150, 1, 150],
      type: "Static",
      ...props,
    }),
    useRef<THREE.Mesh>(null)
  );
  const texture = useLoader(TextureLoader, "img/floor3.jpg");
  texture.repeat = new THREE.Vector2(4, 4);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  console.log("Floor");
  return (
    <mesh ref={ref} receiveShadow>
      <boxGeometry args={[150, 1, 150]} />
      <meshPhongMaterial map={texture} shininess={1} />
    </mesh>
  );
}

export default Floor;
