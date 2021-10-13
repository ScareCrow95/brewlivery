import { Center, Flex, Box } from '@chakra-ui/react'
import Lottie from 'react-lottie'
import { LottieAnimations, LottieConfig } from '../../assets/lottie/LottieAnimations'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'
const DroneIcon = ({ status }) => {
    const size = 10
    return (
        <Flex direction="column" align="center" mt={-size * 0.5}>
            <Center boxSize={size} rounded="full" bg="red.100" boxShadow="2px 2px 20px  #0d0c0e" position="relative">
                <Lottie options={LottieConfig(LottieAnimations.DroneLottie)} height={32} width={32} />
                {status === 'landing' && (
                    <Box position="absolute" bottom={0} mb="-18px" color="white">
                        <MdArrowDropDown size={40} />
                    </Box>
                )}
                {status === 'take-off' && (
                    <Box position="absolute" top={0} mt="-18px" color="white">
                        <MdArrowDropUp size={40} />
                    </Box>
                )}
            </Center>
        </Flex>
    )
}

export default DroneIcon
