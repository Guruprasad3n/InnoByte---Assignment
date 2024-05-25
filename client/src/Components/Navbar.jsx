import React from "react";
import { Box, Flex, Heading, Spacer, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const handleLogin = () => {};
  return (
    <Box bg="teal" px={4} py={3}>
      <Flex alignItems="center">
        <Heading size="md" color="white">
          <Link to={"/"}>Your App Name</Link>
        </Heading>
        <Spacer />
        <Flex gap={10} color={"white"}>
          <Link>Home</Link>
          <Link>About</Link>
          {/* <Link>Contact</Link> */}
        </Flex>
        <Button colorScheme="whiteAlpha" onClick={handleLogin} marginLeft={5}>
          <Link to={"/login"}>Login</Link>
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;

{
  /* <div style={{ backgroundColor: "wheat" }}>
  <div>
    <h1>InnoByte</h1>
    <ul>
      <li>Home</li>
      <li>About</li>
      <li>Signin</li>
    </ul>
  </div>
</div>
</> */
}
