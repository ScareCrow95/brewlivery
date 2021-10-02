import React, { useState, useEffect } from 'react'
import { Box, Text, Center, Flex, Image, Circle, Icon } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { InventoryItem } from '../../store/inventory.store'
import { useStores } from '../../store/root'

const BeerItem = observer(({ _id }) => {
    const { inventoryStore, uiStore } = useStores()
    const item = inventoryStore.inventory.get(_id)
    const selected = uiStore.selectedId === _id
    return (
        <Flex
            p={6}
            cursor="pointer"
            borderRightWidth="4px"
            borderColor={selected ? item.primaryColor : 'transparent'}
            bg={selected ? 'secondary.200' : 'transparent'}
            // _hover={{ bg: 'secondary.200', borderColor: item.primaryColor }}
            onMouseEnter={() => {
                uiStore.selectedId = _id
            }}
            borderTopRightRadius={8}
            borderBottomRightRadius={8}
            align="center"
        >
            <Image src={`/image/${_id}.png`} w="40px" />
            <Flex direction="column" ml={6}>
                <Text fontWeight="bold">{item.name}</Text>
                <Text fontSize="sm" color="grey.300">
                    {item.tagline}
                </Text>
                <Flex fontSize="sm" mt={2}>
                    <Text mr={2}>{item.alcohol}%</Text>
                    <Text>{item.size}</Text>
                </Flex>
            </Flex>
            <Flex justify="flex-end" fontSize="xl" fontWeight="bold" flex={1}>
                <Text>{item.cost}</Text>
            </Flex>
        </Flex>
    )
})

export default BeerItem
