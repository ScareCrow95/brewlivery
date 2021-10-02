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
        console.log(first)
        return [split.join(' '), first]
    }

    return (
        <Flex justify="flex-end" align="center" flex={1} overflow="hidden" mr="100px" zIndex={1}>
            <Flex direction="column" mr="-178px" textAlign="right" align="flex-end" mt={16} zIndex={1}>
                <Text fontWeight="black" fontSize="6xl">
                    {getTagElements()[0].toUpperCase()}{' '}
                    <Text as="span" color={selected.secondaryColor} bg={selected.primaryColor} px={3}>
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
            <Flex mr="-180px" h="450px" mt="130px" opacity="1" zIndex={2}>
                <Image src={shadowLeft} className="selector" />
            </Flex>
            <Flex h="50vh" direction="column" mt={selected.offset}>
                <Image src={`/image/${selected._id}.png`} objectFit="contain" zIndex={3} className="selector" />
                <Image
                    src={canShadow}
                    mt="-70px"
                    ml="50px"
                    zIndex={2}
                    css={{ transform: 'scale(1.5)' }}
                    className="selector"
                />
                <Image
                    src={`/image/${selected._id}.png`}
                    zIndex={1}
                    className="mask-img selector"
                    mt="-100px"
                    objectFit="contain"
                />
            </Flex>
            <Flex ml="-98px" direction="column" mt="120px" justify="flex-end">
                <Text maxW="300px" bg="black" p={3}>
                    {selected.description1}
                </Text>
                <Box w="315px" h="1px" bg="input.100" my={4} ml={-4} />
                <Text maxW="300px" pl={3}>
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
            <Box
                w="330px"
                h="400px"
                position="absolute"
                zIndex={1}
                bg={selected.primaryColor}
                top="10%"
                left="45%"
                className="clip"
            />
            <Box
                w="330px"
                h="400px"
                ml="30px"
                mt="20px"
                position="absolute"
                zIndex={1}
                bg={selected.primaryColor}
                top="10%"
                left="45%"
                className="clip"
            />
            <Text
                position="absolute"
                zIndex={1}
                top="10%"
                left="56%"
                fontWeight="black"
                fontSize="4xl"
                style={{ textShadow: '3px 3px 5px #444' }}
            >
                {selected.cost}
            </Text>
            <Box
                position="absolute"
                h="100vh"
                w="80vw"
                bg="secondary.300"
                top={0}
                left={0}
                zIndex={0}
                className="bg-clip"
            />
        </Flex>
    )
})

export default BeerPreview
