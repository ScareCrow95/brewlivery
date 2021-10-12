import { Center, Flex, Image, Text } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { MdRemoveCircle } from 'react-icons/md'
import { useStores } from '../../store/root'
import roundTwoDecimal from '../../utils/roundTwoDecimal'

const TrackOrderItem = observer(({ orderId, _id }) => {
    const { orderStore } = useStores()
    const item = orderStore.orders.get(orderId).cart.get(_id)
    return (
        <Flex py={2} align="center">
            <Image src={`/image/${_id}.png`} w="16px" />
            <Text ml={3}>{item.inventory.name}</Text>
            <Text ml={2} color="grey.300">
                x
            </Text>
            <Text ml={1} fontWeight="bold" color="primary.100">
                {item.count}
            </Text>
            <Flex justify="flex-end" fontSize="xl" fontWeight="bold" flex={1} mr={2}>
                <Text>${roundTwoDecimal(item.inventory._cost * item.count)}</Text>
            </Flex>
        </Flex>
    )
})

export default TrackOrderItem
