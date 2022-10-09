import { Html } from "@react-three/drei";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { deadState, respawnCountState } from "../atoms";
const RetryContainer = styled.div`
  width: 200px;
  height: 110px;
  display: flex;
  border-radius: 20px;
  flex-direction: column;
  background-color: rgba(1, 1, 1, 0.5);
`;
const Msg = styled.h1`
  width: 100%;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 1);
  font-size: 1.3rem;
`;

const ChanceNumber = styled.h3`
  color: white;
  text-align: center;
  font-size: 0.8rem;
`;

const BtnContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
`;
const RetryBtn = styled.button`
  width: 80px;
  height: 30px;
  color: white;
  background-color: rgba(1, 1, 1, 0.7);
  border-radius: 10px;
  :hover {
    border: 1px solid white;
    cursor: pointer;
    background-color: rgba(1, 1, 1, 0.9);
  }
`;
const ExitBtn = styled(RetryBtn)``;

function Retry() {
  const [isDead, setIsDead] = useRecoilState(deadState);
  const [respawnCount, setRespawnCount] = useRecoilState(respawnCountState);
  const clickRetry = () => {
    setIsDead(false);
    setRespawnCount((prev) => prev + 1);
  };
  const clickExit = () => {
    window.close();
  };
  return (
    <Html
      calculatePosition={() => [
        window.innerWidth / 2 - 100,
        window.innerHeight / 2,
      ]}
    >
      <RetryContainer hidden={!isDead}>
        <Msg>{isDead && respawnCount === 4 ? `Game Over` : `Try again?`}</Msg>
        <ChanceNumber>{`남은 재도전 기회 : ${4 - respawnCount}`}</ChanceNumber>
        <BtnContainer>
          <RetryBtn
            hidden={isDead && respawnCount === 4 ? true : false}
            onClick={clickRetry}
          >
            Respawn
          </RetryBtn>
          <ExitBtn onClick={clickExit}>Exit</ExitBtn>
        </BtnContainer>
      </RetryContainer>
    </Html>
  );
}
export default Retry;
