import { Html } from "@react-three/drei";
import styled from "styled-components";

const RetryContainer = styled.div``;
const Msg = styled.h1``;
const BtnContainer = styled.div``;
const RetryBtn = styled.button``;
const ExitBtn = styled(RetryBtn)``;
function Retry() {
  return (
    <Html fullscreen>
      <RetryContainer>
        <Msg>아쉬워요ㅜㅜ</Msg>
        <BtnContainer>
          <RetryBtn>다시하기</RetryBtn>
          <ExitBtn>종료하기</ExitBtn>
        </BtnContainer>
      </RetryContainer>
    </Html>
  );
}

export default Retry;
