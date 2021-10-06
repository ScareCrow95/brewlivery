import React, { useState, useEffect } from 'react'
import { Box, Text, Center, Flex, Image, Circle, Icon, Spacer, Button } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../store/root'
import BeerItem from './BeerItem'
import CartItem from './CartItem'

const Menu = observer(() => {
    const { inventoryStore, uiStore, cartStore } = useStores()
    function cartTotal() {
        if (cartStore.cart.size) {
            return (
                <Text color="white" fontSize="xl" fontWeight="bold" mr={4}>
                    {cartStore.totalCost}
                </Text>
            )
        } else {
            return (
                <Text color="grey.300" fontSize="xl" fontWeight="thin" mr={2}>
                    (Empty)
                </Text>
            )
        }
    }
    return (
        <Flex w="400px" bg="secondary.300" direction="column" h="100vh" zIndex={4}>
            <Flex p={6} py={5} align="center" borderBottomWidth="1px">
                <Text>Your Cart</Text>
                {cartStore.cart.size > 0 && (
                    <Center ml={1} boxSize={4} bg="red" mt={-4} fontSize="xs" fontWeight="bold" rounded="full">
                        <Text ml="-1px" mt="1px">
                            {cartStore.cart.size}
                        </Text>
                    </Center>
                )}
                <Spacer />
                {cartTotal()}
            </Flex>
            <Flex direction="column" overflowY="auto" css={uiStore.scrollCSS} pr={1}>
                {cartStore.cart.size > 0 && (
                    <>
                        <Box mt={3} />
                        {cartStore.array.map((x) => {
                            return <CartItem key={x._id} _id={x._id} />
                        })}
                        <Box mt={3} />
                        <Flex justify="flex-end">
                            <Button bg="primary.100" size="sm" m={3} mt={0} onClick={() => (uiStore.checkout = true)}>
                                Checkout
                            </Button>
                        </Flex>
                        <Flex borderBottomWidth="1px" />
                    </>
                )}
                {Array.from(inventoryStore.inventory.values()).map((x) => {
                    return <BeerItem key={x._id} _id={x._id} />
                })}
            </Flex>
        </Flex>
    )
})

export default Menu
