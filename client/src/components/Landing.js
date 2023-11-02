import { Outlet } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Box, // Import Box from Chakra UI
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

function Landing() {
  return (
    <Box 
      bg="blue.100" 
      p={4} 
    >
      <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
        <BreadcrumbItem p={4}>
          <Button colorScheme="blue">
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </Button>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <Button colorScheme="blue">
            <BreadcrumbLink href="/about">About</BreadcrumbLink>
          </Button>
        </BreadcrumbItem>

        <BreadcrumbItem p={4}>
          <Button colorScheme="blue">
            <BreadcrumbLink href="/signup">Signup</BreadcrumbLink>
          </Button>
        </BreadcrumbItem>

        <BreadcrumbItem p={4}>
          <Button colorScheme="blue">
            <BreadcrumbLink href="/login">Login</BreadcrumbLink>
          </Button>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <Button colorScheme="blue">
            <BreadcrumbLink href="/contact">Contact</BreadcrumbLink>
          </Button>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <Button colorScheme="blue">
            <BreadcrumbLink href="/reviews">Reviews</BreadcrumbLink>
          </Button>
        </BreadcrumbItem>

      </Breadcrumb>
      <Outlet />
    </Box>
  );
}

export default Landing;
