import BoardMsg from "./BoardMsg";

function Board() {
  return (
    <>
      <group position-x={-30} position-z={0} castShadow receiveShadow>
        <mesh name="기둥" position={[0, 10, 0]}>
          <cylinderGeometry args={[1, 1, 20, 16]} />
          <meshPhongMaterial color="#2c3e50" />
        </mesh>
        <mesh name="바닥" position={[0, 1, 0]}>
          <boxGeometry args={[10, 0.3, 10]} />
          <meshPhongMaterial color="#2c3e50" />
        </mesh>
        <mesh name="전광판" position={[0, 20, 0]}>
          <boxGeometry args={[3, 15, 30]} />
          <meshPhongMaterial color="#21262e" />
          <BoardMsg />
        </mesh>
      </group>
    </>
  );
}

export default Board;
