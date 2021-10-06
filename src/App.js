import { Box, Flex, Spacer, Text } from '@chakra-ui/layout'
import React from 'react'
import './app.css'
import BeerPreview from './components/beerPreview/BeerPreview'
import Checkout from './components/Checkout'
import Header from './components/header/Header'
import Menu from './components/menu/Menu'

const App = () => {
    return (
        <Flex direction="column" w="100vw" h="100vh" bg="secondary.200" position="relative">
            <Flex flex={1}>
                <Flex flex={1} direction="column">
                    <Header />
                    <BeerPreview />
                    <Checkout />
                </Flex>
                <Menu />
            </Flex>
        </Flex>
    )
}

export default App
