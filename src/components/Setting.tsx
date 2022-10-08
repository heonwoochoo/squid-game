import { useThree, Vector3, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import * as THREE from "three";
import { deadState } from "../atoms";

function Setting() {
  const isDead = useRecoilValue(deadState);
  const { gl, scene } = useThree();
  const spotLightDistance = 40;
  const spotLightPosition: Vector3[] = [
    [-spotLightDistance, spotLightDistance, spotLightDistance],
    [spotLightDistance, spotLightDistance, spotLightDistance],
    [-spotLightDistance, spotLightDistance, -spotLightDistance],
    [spotLightDistance, spotLightDistance, -spotLightDistance],
  ];
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    // WebGLRenderer
    gl.setSize(window.innerWidth, window.innerHeight);
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
    console.log(gl.info);
    // Scene
    scene.background = new THREE.Color("rgb(95, 32, 16)");

    // Light
    ref.current?.children.forEach((light) => {
      light.lookAt(0, 0, 0);
    });
    if (!isDead) {
      ref.current?.children.forEach((light: any) => {
        light.intensity = 1;
      });
    }
  }, [isDead]);

  useFrame(() => {
    if (isDead) {
      ref.current?.children.forEach((light: any) => {
        if (light.intensity > 0.3) light.intensity -= 0.01;
      });
    }
  });

  return (
    <group ref={ref}>
      {spotLightPosition.map((position, i) => (
        <spotLight
          intensity={1}
          color="#ffe9ac"
          position={position}
          key={i}
          castShadow={true}
          shadow-mapSize={[1024, 1024]}
        />
      ))}
    </group>
  );
}

export default Setting;
