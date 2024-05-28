import React, { useState } from "react";
import {
  Box,
  Container,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    name: user.user.name,
    email: user.user.email,
    password: "",
  });
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsOtpModalOpen(true);
  };

  const handleOtpModalClose = () => {
    setIsOtpModalOpen(false);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    
    if (otp === "123456") { 
      setIsOtpModalOpen(false);
      setIsEditModalOpen(true);
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct OTP.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
   
    console.log(formData);
    setIsEditModalOpen(false);
  };

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
          p={4}
        >
          <Text>Name: {user.user.name}</Text>
          <Text>Email: {user.user.email}</Text>
          <Text>Password: {user.user.password}</Text>
          <Button mt={4} colorScheme="teal" onClick={handleEditClick}>
            Edit
          </Button>
        </Box>
      </Container>

      {/* OTP Modal */}
      <Modal isOpen={isOtpModalOpen} onClose={handleOtpModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter OTP</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleOtpSubmit}>
            <ModalBody>
              <FormControl id="otp" mb={4}>
                <FormLabel>OTP</FormLabel>
                <Input
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter the OTP sent to your email"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleOtpModalClose}>
                Close
              </Button>
              <Button type="submit" colorScheme="teal">
                Verify OTP
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={handleEditModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleFormSubmit}>
            <ModalBody>
              <FormControl id="name" mb={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                />
              </FormControl>

              <FormControl id="email" mb={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  value={formData.email}
                  isDisabled
                  placeholder="Enter your email"
                />
              </FormControl>

              <FormControl id="password" mb={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  type="password"
                  placeholder="Enter your new password"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleEditModalClose}>
                Close
              </Button>
              <Button type="submit" colorScheme="teal">
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Profile;











// import { Box, Container, Text } from "@chakra-ui/react";
// import { useSelector } from "react-redux";

// function Profile() {
//   const { user } = useSelector((state) => state.user);

//   console.log(user);

//   return (
//     <>
//       <Text
//         fontSize={"4xl"}
//         fontWeight={700}
//         mt={10}
//         textDecoration={"underline"}
//         textAlign={"center"}
//       >
//         Profile
//       </Text>

//       <Container mt={10}>
//         <Box
//           m={"auto"}
//           maxW="sm"
//           borderWidth="1px"
//           borderRadius="lg"
//           overflow="hidden"
//           fontSize={"2xl"}
//         >
//           <Text>Name: {user.user.name}</Text>
//           <Text>Email: {user.user.email}</Text>
//           <Text>Password: {user.user.password}</Text>
//         </Box>
//       </Container>
//     </>
//   );
// }

// export default Profile;
