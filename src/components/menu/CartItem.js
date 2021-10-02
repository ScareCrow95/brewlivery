import { Center, Flex, Image, Text } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { MdRemoveCircle } from 'react-icons/md'
import { useStores } from '../../store/root'
import roundTwoDecimal from '../../utils/roundTwoDecimal'
const CartItem = observer(({ _id }) => {
    const { cartStore } = useStores()
    const item = cartStore.cart.get(_id)
    return (
        <Flex pl={8} py={2} align="center">
            <Image src={`/image/${_id}.png`} w="20px" />
            <Text ml={3} fontWeight="black">
                {item.inventory.name}
            </Text>
            <Text ml={2} color="grey.300">
                x
            </Text>
            <Text ml={1} fontWeight="bold" color="primary.100">
                {item.count}
            </Text>
            <Flex justify="flex-end" fontSize="xl" fontWeight="bold" flex={1}>
                <Text>${roundTwoDecimal(item.inventory._cost * item.count)}</Text>
            </Flex>
            <Center px={2} cursor="pointer" onClick={() => cartStore.remove(_id)}>
                <MdRemoveCircle color="red" size={16} />
            </Center>
        </Flex>
    )
})

export default CartItem
