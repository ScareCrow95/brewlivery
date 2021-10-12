import { Center, Flex } from '@chakra-ui/react'
import Lottie from 'react-lottie'
import { LottieAnimations, LottieConfig } from '../../assets/lottie/LottieAnimations'
const DroneIcon = () => {
    const size = 12
    return (
        <Flex direction="column" align="center" mt={-size * 0.5}>
            <Center boxSize={size} rounded="full" bg="red.100" boxShadow="2px 2px 10px #0d0c0e">
                <Lottie options={LottieConfig(LottieAnimations.DroneLottie)} height={40} width={40} />
            </Center>
        </Flex>
    )
}

export default DroneIcon
