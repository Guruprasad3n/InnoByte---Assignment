import { Box, Container, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

function Profile() {
  const { user } = useSelector((state) => state.user);

  console.log(user);

  return (
    <>
      <Text
        fontSize={"4xl"}
        fontWeight={700}
        mt={10}
        textDecoration={"underline"}
        textAlign={"center"}
      >
        Profile
      </Text>

      <Container mt={10}>
        <Box
          m={"auto"}
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          fontSize={"2xl"}
        >
          <Text>Name: {user.user.name}</Text>
          <Text>Email: {user.user.email}</Text>
          <Text>Password: {user.user.password}</Text>
        </Box>
      </Container>
    </>
  );
}

export default Profile;
