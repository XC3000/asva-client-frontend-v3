import React from "react";
import { Container, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Container maxW="2xl" centerContent>
      <Spinner color="pink.500" />
    </Container>
  );
};

export default Loader;
