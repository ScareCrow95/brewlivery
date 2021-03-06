import { Flex, Image, Text, Box, Circle } from '@chakra-ui/react'
import React from 'react'
// import can1 from '../../.`/public/${selected._id}/can1.png`
import canShadow from '../../assets/shadow.png'
import shadowLeft from '../../assets/shadowLeft.png'
import './beer-preview.css'
import { useStores } from '../../store/root'
import { observer } from 'mobx-react-lite'
const BeerPreview = observer(() => {
    // const {uiStore} = useStore
    const { uiStore, cartStore } = useStores()
    const { selected } = uiStore

    function getTagElements() {
        const split = selected?.tagline.split(' ')
        const last = split.pop()
        return [split.join(' '), last]
    }

    function getTitleElements() {
        const split = selected?.name.split(' ')
        const first = split.shift()
        return [split.join(' '), first]
    }

    return (
        <Flex justify="flex-end" align="center" flex={1} overflow="hidden" mr="100px" zIndex={1} ove>
            <Flex direction="column" mr="-148px" textAlign="right" align="flex-end" mt="-20px" zIndex={1}>
                <Text fontWeight="black" fontSize="4xl">
                    {getTagElements()[0].toUpperCase()}{' '}
                    <Text as="span" color={selected.secondaryColor} bg={selected.primaryColor} px={3} py={4}>
                        {getTagElements()[1].toUpperCase()}
                    </Text>
                </Text>
                <Flex direction="column" align="flex-end" mr={8} mt={10}>
                    <Flex direction="column" textAlign="center" align="center">
                        <Text fontWeight="semibold" fontSize="5xl">
                            {getTitleElements()[1].toUpperCase()}
                        </Text>
                        <Text fontSize="3xl" letterSpacing="10px" mt="-15px" color={selected.primaryColor}>
                            •{getTitleElements()[0].toUpperCase()}•
                        </Text>
                    </Flex>
                </Flex>
                <Box w="300px" h="1px" bg="input.100" my={3} />
                <Flex color="grey.300" mr={8}>
                    <Text fontSize="xl" mr={5}>
                        ALC{' '}
                        <Text as="span" color="white" fontWeight="bold">
                            4.5%
                        </Text>
                    </Text>
                    <Text fontSize="xl" color="white">
                        330ML
                    </Text>
                </Flex>
            </Flex>
            <Flex mr="-20px" h="300px" mt="-80px" opacity="1" zIndex={2}>
                <Image src={shadowLeft} className="selector" />
            </Flex>
            <Flex maxW="200px" minW="200px" direction="column" mt={selected.offset} shrink={0}>
                <Image
                    mt="120px"
                    src={`/image/${selected._id}.png`}
                    objectFit="contain"
                    shrink={0}
                    maxW="200px"
                    minW="200px"
                    zIndex={3}
                    className="selector"
                />
                <Image
                    src={canShadow}
                    top="74.1%"
                    mt="-30px"
                    ml="18px"
                    maxW="200px"
                    opacity=".8"
                    minW="200px"
                    zIndex={2}
                    css={{ transform: 'scale(2.5)' }}
                    className="selector"
                />
                <Box overflow="hidden" h={40} mt={-3}>
                    <Image
                        src={`/image/${selected._id}.png`}
                        zIndex={1}
                        maxW="200px"
                        minW="200px"
                        className="mask-img selector"
                        mt="-40px"
                        objectFit="contain"
                    />
                </Box>
                <Flex overflow="hidden">
                    <Box
                        w="430px"
                        h="500px"
                        ml="-30px"
                        position="absolute"
                        zIndex={1}
                        bg={selected.primaryColor}
                        className="clip"
                        top="80px"
                    />
                    <Box
                        w="430px"
                        h="500px"
                        ml="10px"
                        mt="-10px"
                        position="absolute"
                        zIndex={1}
                        bg={selected.primaryColor}
                        className="clip-2"
                        top="80px"
                    />
                    <Box
                        position="absolute"
                        h="100%"
                        w="100%"
                        bg="secondary.300"
                        ml="-490px"
                        top={0}
                        left={0}
                        zIndex={0}
                        className="bg-clip"
                    />
                    <Text
                        position="absolute"
                        zIndex={2}
                        ml="270px"
                        top="90px"
                        fontWeight="black"
                        fontSize="4xl"
                        style={{ textShadow: '3px 3px 5px rgba(0,0,0,.7)' }}
                    >
                        {selected.cost}
                    </Text>
                </Flex>
            </Flex>
            <Flex direction="column" mt="-20px" zIndex={2}>
                <Text maxW="300px" bg="black" p={3} pl={5}>
                    {selected.description1}
                </Text>
                <Box w="315px" h="1px" bg="input.100" my={4} ml={-4} />
                <Text maxW="300px" pl={5}>
                    {selected.description2}
                </Text>
                <Flex>
                    <Flex
                        ml={3}
                        mt={8}
                        mb={-8}
                        border="2px"
                        p={3}
                        px={5}
                        zIndex={10}
                        cursor="pointer"
                        justify="center"
                        color={selected.primaryColor}
                        _hover={{ boxShadow: `0 0 10px ${selected.primaryColor}` }}
                        onClick={() => {
                            cartStore.add(selected._id)
                        }}
                    >
                        <Text fontWeight="bold" fontSize="xl" zIndex={10}>
                            ADD TO CART
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
})

export default BeerPreview
