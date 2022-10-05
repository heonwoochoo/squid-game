import { useThree, Vector3 } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

function Setting() {
  const { gl, scene } = useThree();
  const spotLightDistance = 50;
  const spotLightPosition: Vector3[] = [
    [-spotLightDistance, spotLightDistance, spotLightDistance],
    [spotLightDistance, spotLightDistance, spotLightDistance],
    [-spotLightDistance, spotLightDistance, -spotLightDistance],
    [spotLightDistance, spotLightDistance, -spotLightDistance],
  ];
  useEffect(() => {
    // WebGLRenderer
    gl.setSize(window.innerWidth, window.innerHeight);
    gl.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
    console.log(gl.info);
    // Scene
    scene.background = new THREE.Color("rgb(95, 32, 16)");
  }, []);
  return (
    <>
      {spotLightPosition.map((position, i) => (
        <spotLight
          intensity={0.7}
          color="#ffe9ac"
          position={position}
          key={i}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
      ))}
    </>
  );
}

export default Setting;
