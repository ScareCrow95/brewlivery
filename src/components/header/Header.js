import { Box, Flex, Spacer, Text, Image } from '@chakra-ui/react'
import React from 'react'
import icon from '../../assets/icon.png'
const Header = () => {
    const HeaderBtn = ({ title }) => {
        return (
            <Flex mr={10} color="grey.300" _hover={{ color: 'primary.100' }} cursor="pointer">
                <Text>{title}</Text>
            </Flex>
        )
    }

    return (
        <Flex align="center" zIndex={2} m={4} ml={6}>
            <Image src={icon} w="33px" mr={2} mt={1} />
            <Flex direction="column">
                <Text fontSize="4xl" fontWeight="bold">
                    BREW
                    <Text as="span" color="primary.100" fontWeight="normal">
                        LIVERY
                    </Text>
                </Text>
                <Box w="210px" h="1px" bg="input.100" mt="-5px" />
                <Text letterSpacing="10px" fontSize="sm" ml="2px" color="grey.300">
                    OVER THE{' '}
                    <Text as="span" color="white" fontWeight="bold">
                        AIR
                    </Text>
                </Text>
            </Flex>
        </Flex>
    )
}

export default Header
