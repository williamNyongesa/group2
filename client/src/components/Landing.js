import { Outlet} from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    // BreadcrumbSeparator,
    Button
  } from '@chakra-ui/react'
import { ChevronRightIcon} from "@chakra-ui/icons"



function Landing(){
    return (
        <div>

        <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
        <BreadcrumbItem p={4}>
        <Button colorScheme='blue'><BreadcrumbLink href='/'>Home</BreadcrumbLink></Button>
        </BreadcrumbItem>

        <BreadcrumbItem p={4}>
        <Button colorScheme='blue'><BreadcrumbLink href='/signup'>Signup</BreadcrumbLink></Button>
        </BreadcrumbItem>

        <BreadcrumbItem p={4}>
        <Button colorScheme='blue'><BreadcrumbLink href='/login'>Login</BreadcrumbLink></Button>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
        <Button colorScheme='blue'><BreadcrumbLink href='#'>Contact</BreadcrumbLink></Button>
        </BreadcrumbItem>
        </Breadcrumb>
        <Outlet></Outlet> 
        </div>
    )
}
export default Landing