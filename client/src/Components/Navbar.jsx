import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../Redux/Auth/authSlice";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user);
  }, [user]);
  // console.log(user.user.name);
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <Box bg="teal" px={4} py={3}>
      <Flex alignItems="center">
        <Heading size="md" color="white">
          <Link to={"/"}>Your App Name</Link>
        </Heading>
        <Spacer />
        <Flex gap={10} color={"white"}>
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
        </Flex>
        {user ? (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              colorScheme="teal"
              ml={2}
            >
              {user.name}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button colorScheme="whiteAlpha" marginLeft={5}>
            <Link to={"/login"}>Login</Link>
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
