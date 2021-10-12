import { Center, Flex, Text } from '@chakra-ui/react'
import { IoBeer } from 'react-icons/io5'

const BreweryIcon = () => {
    return (
        <Flex direction="column" align="center" mt="-50px">
            <Flex>
                <Text fontSize="md" bg="secondary.200" px={3} py={1} mb={1} rounded="full">
                    Brewlivery
                </Text>
            </Flex>
            <Center boxSize={10} rounded="full" bg="primary.100" boxShadow="2px 2px 10px #0d0c0e">
                <IoBeer size={20} />
            </Center>
        </Flex>
    )
}

export default BreweryIcon
