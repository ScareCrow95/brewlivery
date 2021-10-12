import {
    Box,
    Text,
    Center,
    Flex,
    Image,
    Circle,
    Icon,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Button,
    Spacer,
} from '@chakra-ui/react'
import { FaMapMarkerAlt } from 'react-icons/fa'

const DropoffIcon = ({ far }) => {
    return (
        <Flex direction="column" align="center">
            <Flex bg="secondary.200" px={3} py={1} mb={1} rounded="full" w="90px" mt="-50px" justify="center">
                <Text fontSize="md" shrink={0}>
                    {far ? 'Too Far' : 'Drop off'}
                </Text>
            </Flex>
            <Center boxSize={10} rounded="full" bg={far ? 'red.100' : 'green.100'} boxShadow="2px 2px 10px #0d0c0e">
                <FaMapMarkerAlt size={20} />
            </Center>
        </Flex>
    )
}

export default DropoffIcon
