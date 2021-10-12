import { Center, Flex } from '@chakra-ui/react'
import Lottie from 'react-lottie'
import { LottieAnimations, LottieConfig } from '../../assets/lottie/LottieAnimations'
const PrepIcon = () => {
    const size = 12
    return (
        <Flex direction="column" align="center" mt={-size * 0.5}>
            <Center boxSize={size} rounded="full" boxShadow="2px 2px 10px #0d0c0e">
                <Lottie options={LottieConfig(LottieAnimations.BeerLottie)} height={108} width={108} />
            </Center>
        </Flex>
    )
}

export default PrepIcon
