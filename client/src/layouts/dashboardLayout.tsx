import {
  Box,
  Flex,
  HStack,
  Heading,
  IconButton,
  Text,
  Container, Breadcrumb, Button, Separator,
} from '@chakra-ui/react';

import { AiOutlinePlus, AiOutlineUser } from 'react-icons/ai';
import { IoEarthOutline } from 'react-icons/io5'
import { useColorModeValue } from '@/components/ui/color-mode.tsx';
import React from 'react';

export const ContainerDoubleStack: React.FC<React.PropsWithChildren> = ({children}) => {

  return (
    <>
      <Box as="nav" h='16' p='3' borderBottom="1px" borderColor={useColorModeValue('gray.200', 'gray.600')}>
        <Flex as={Container} maxW='7xl' alignItems="center" justifyContent="space-between" >
          <Heading as='h1' size="md">{"BrandName"}</Heading>
          <HStack>
            <IconButton variant="ghost" rounded="full" size="lg" aria-label='earth icon' >
              <IoEarthOutline />
            </IconButton>
            <IconButton rounded="full" size="lg" aria-label='user icon' >
              <AiOutlineUser />
            </IconButton>
          </HStack>
        </Flex>
      </Box>
      <Box as="nav" h='16' p='3' borderBottom="1px" borderColor={useColorModeValue('gray.200', 'gray.600')}>
        <Flex as={Container} maxW='7xl' justifyContent="space-between" gap="4">
          <HStack alignItems="center" gap="4">
            <Heading as="h2" size="md">Overview</Heading>
            <Separator orientation="vertical" height="4" />
            <Breadcrumb.Root>
              <Breadcrumb.List>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href='#'>Home</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.Link href='#'>Docs</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.CurrentLink>Breadcrumb</Breadcrumb.CurrentLink>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
          </HStack>
          <Button colorScheme='blue'>
            <AiOutlinePlus /> New Project
          </Button>
        </Flex>
      </Box>
      <Flex as="main" minH="78vh" align="center" justify="center" bg={useColorModeValue('gray.50', 'gray.900')}>
        <Box textAlign="center">
          <Heading as='h3'>Box Heading</Heading>
          <Text>Empty Box Content</Text>
          {children}
        </Box>
      </Flex>
    </>
  )
}
