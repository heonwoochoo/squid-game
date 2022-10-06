import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";
import { BoxProps, useBox } from "@react-three/cannon";
import React, { useRef } from "react";
const Floor = React.memo(() => {
  console.log("Floor");
  const [ref, api] = useBox(
    () => ({
      args: [150, 1, 150],
      type: "Static",
    }),
    useRef<THREE.Mesh>(null)
  );
  const texture = useLoader(TextureLoader, "img/floor3.jpg");
  texture.repeat = new THREE.Vector2(4, 4);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  return (
    <group dispose={null}>
      <mesh ref={ref} receiveShadow>
        <boxGeometry args={[150, 1, 150]} />
        <meshPhongMaterial map={texture} shininess={1} />
      </mesh>
    </group>
  );
});

export default Floor;
