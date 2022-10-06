import { Html } from "@react-three/drei";
import styled from "styled-components";

const RetryContainer = styled.div`
  width: 200px;
  height: 100px;
  display: flex;
  border-radius: 20px;
  flex-direction: column;
  background-color: rgba(1, 1, 1, 0.5);
`;
const Msg = styled.h1`
  width: 100%;
  text-align: center;
  margin-top: 10px;
  color: rgba(255, 255, 255, 1);
  font-size: 1.5rem;
`;
const BtnContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
`;
const RetryBtn = styled.button`
  margin-bottom: 10px;
`;
const ExitBtn = styled(RetryBtn)``;
function Retry() {
  return (
    <Html
      calculatePosition={() => [
        window.innerWidth / 2 - 100,
        window.innerHeight / 2,
      ]}
    >
      <RetryContainer>
        <Msg>Game Over</Msg>
        <BtnContainer>
          <RetryBtn>다시하기</RetryBtn>
          <ExitBtn>종료하기</ExitBtn>
        </BtnContainer>
      </RetryContainer>
    </Html>
  );
}

export default Retry;
