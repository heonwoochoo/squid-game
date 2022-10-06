import { Html } from "@react-three/drei";
import { motion } from "framer-motion";
import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const LoadingText = styled.h1`
  font-size: 2rem;
  color: white;
`;

const CircleContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Circle = styled(motion.span)`
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  background-color: white;
  border-radius: 0.75rem;
  margin: 10px;
`;

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const loadingCircleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "100%",
  },
};
const loadingCircleTransition = {
  duration: 0.5,
  repeat: Infinity,
  ease: "easeInOut",
};

function Loader() {
  return (
    <Html>
      <LoadingContainer>
        <LoadingText>Loading...</LoadingText>
        <CircleContainer
          variants={loadingContainerVariants}
          initial="start"
          animate="end"
        >
          <Circle
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          />
          <Circle
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          />
          <Circle
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          />
        </CircleContainer>
      </LoadingContainer>
    </Html>
  );
}

export default Loader;
