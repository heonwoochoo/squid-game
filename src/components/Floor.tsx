import * as THREE from "three";
import { useBox } from "@react-three/cannon";
import React, { useRef } from "react";
import { useTexture } from "@react-three/drei";
const Floor = React.memo(() => {
  const [ref] = useBox(
    () => ({
      args: [150, 1, 150],
      type: "Static",
      userData: { name: "floor" },
    }),
    useRef<THREE.Mesh>(null)
  );

  const texture = useTexture("/assets/img/floor3.jpg", () => {
    texture.repeat = new THREE.Vector2(4, 4);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
  });

  return (
    <group receiveShadow>
      <mesh ref={ref} receiveShadow={true}>
        <boxGeometry args={[150, 1, 150]} />
        <meshPhongMaterial normalMap={texture} shininess={0.05} />
      </mesh>
    </group>
  );
});

export default Floor;
