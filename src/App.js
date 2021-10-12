import { Box, Flex, Spacer, Text } from '@chakra-ui/layout'
import { observer } from 'mobx-react-lite'
import React from 'react'
import './app.css'
import BeerPreview from './components/beerPreview/BeerPreview'
import Checkout from './components/Checkout'
import Header from './components/header/Header'
import Menu from './components/menu/Menu'
import TrackOrder from './components/track/TrackOrder'
import { useStores } from './store/root'

const App = observer(() => {
    const { uiStore } = useStores()
    return (
        <Flex direction="column" w="100vw" h="100vh" bg="secondary.200">
            <Flex flex={1}>
                <Flex flex={1} direction="column">
                    <Header />
                    {uiStore.mainScreen === 'menu' ? (
                        <>
                            <BeerPreview />
                            <Checkout />
                        </>
                    ) : (
                        <TrackOrder />
                    )}
                </Flex>
                {uiStore.mainScreen === 'menu' && <Menu />}
            </Flex>
        </Flex>
    )
})

export default App
