import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Center, Text3D } from "@react-three/drei";
function BoardMsg() {
  const [text, setText] = useState("Welcome to Squid Game");
  const center = useRef<THREE.Group>(null);
  const font = useRef<THREE.Mesh>(null);
  useEffect(() => {
    console.log(center.current);
  }, []);
  return (
    <Center ref={center} rotation={[0, Math.PI / 2, 0]} position={[1.5, 0, 0]}>
      <Text3D
        ref={font}
        height={0.1}
        lineHeight={0.5}
        letterSpacing={0.2}
        size={1}
        font="./font/inter.json"
        name=""
      >
        {text}
        <meshPhongMaterial />
      </Text3D>
    </Center>
  );
}

export default BoardMsg;
