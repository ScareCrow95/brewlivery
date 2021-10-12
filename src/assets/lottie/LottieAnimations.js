// import * as DieEmoji from './die.json'
import DroneLottie from './drone.json'
import BeerLottie from './beer.json'

export const LottieAnimations = {
    DroneLottie,
    BeerLottie,
}

export const LottieConfig = (animationData) => {
    return {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    }
}
