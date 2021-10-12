import { Box, Flex, Spacer, Text, Image } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React from 'react'
import icon from '../../assets/icon.png'
import { useStores } from '../../store/root'
const Header = observer(() => {
    const { uiStore } = useStores()

    const HeaderBtn = observer(({ title, id }) => {
        return (
            <Flex
                mr={10}
                align="center"
                color={uiStore.mainScreen === id ? 'primary.100' : 'grey.300'}
                fontWeight={uiStore.mainScreen === id ? 'bold' : 'normal'}
                _hover={{ color: 'primary.100', textShadow: '2px 2px 18px #ff6a00' }}
                cursor="pointer"
                onClick={() => (uiStore.mainScreen = id)}
            >
                <Text>
                    {uiStore.mainScreen === id ? '• ' : ''}
                    {title}
                </Text>
            </Flex>
        )
    })

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
            <Flex ml={16} align="center">
                <HeaderBtn title="Menu" id="menu" />
                <HeaderBtn title="Track Orders" id="track" />
            </Flex>
        </Flex>
    )
})

export default Header
