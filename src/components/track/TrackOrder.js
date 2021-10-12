import { Badge, Box, Flex, Spacer, Text } from '@chakra-ui/react'
import { formatDistance, formatRelative } from 'date-fns'
import GoogleMapReact from 'google-map-react'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef, useState } from 'react'
import { useStores } from '../../store/root'
import { mapTheme } from '../../theme/mapTheme'
import BreweryIcon from '../common/BreweryIcon'
import DropoffIcon from '../common/DropoffIcon'
import DroneIcon from '../common/DroneIcon'
import PrepIcon from '../common/PrepIcon'
import TrackOrderItem from './TrackOrderItem'
import Lottie from 'react-lottie'
import { LottieAnimations, LottieConfig } from '../../assets/lottie/LottieAnimations'

const TrackOrder = observer(() => {
    const { orderStore, uiStore, palefire } = useStores()
    const selectedOrder = uiStore.selectedOrder
    const [center, setCenter] = useState(palefire)
    const [zoom, setZoom] = useState(13)

    useEffect(() => {
        setCenter({ lat: selectedOrder.lat, lng: selectedOrder.lng })
    }, [uiStore.selectedOrderId])

    const polyLine = useRef(null)
    const [map, setMap] = useState({
        loaded: false,
        map: null,
        maps: null,
    })

    function createPath() {
        if (map.loaded) {
            if (polyLine.current === null) {
                polyLine.current = new map.maps.Polyline({
                    strokeColor: '#ff6a00',
                    strokeOpacity: 1,
                    strokeWeight: 5,
                    path: [palefire, { lat: selectedOrder.lat, lng: selectedOrder.lng }], //decodedPolyline.geometry.coordinates
                })
            } else {
                polyLine.current.setOptions({
                    path: [palefire, { lat: selectedOrder.lat, lng: selectedOrder.lng }],
                })
            }
        } else {
            if (polyLine.current !== null)
                polyLine.current.setOptions({
                    path: [],
                })
        }
        if (polyLine.current !== null) polyLine.current.setMap(map.map)
        return null
    }
    return (
        <Flex pl={16} pt={8}>
            <Flex direction="column" w="440px" shrink={0} borderRight="1px" borderColor="secondary.100" pr={4}>
                <Text mb={4}>Recent Orders</Text>
                <Flex direction="column" overflowY="auto" h="70vh" css={uiStore.scrollCSS}>
                    {orderStore.array.map((x) => {
                        return (
                            <Flex
                                key={x._id}
                                my={2}
                                direction="column"
                                _hover={{ bg: 'secondary.150' }}
                                p={3}
                                rounded="md"
                                cursor="pointer"
                                onClick={() => {
                                    uiStore.selectedOrderId = x._id
                                }}
                            >
                                <Flex
                                    direction="column"
                                    borderLeftWidth="5px"
                                    borderColor={x._id === uiStore.selectedOrderId ? 'primary.100' : 'secondary.150'}
                                    pl={2}
                                >
                                    <Flex align="center" mb={1}>
                                        <Badge>Order ID</Badge>
                                        <Text
                                            ml={2}
                                            color={x._id === uiStore.selectedOrderId ? 'primary.100' : 'grey.100'}
                                        >
                                            {x._id.split('-')[0]}
                                        </Text>
                                        <Spacer />
                                        <Badge colorScheme="green">STATUS</Badge>
                                        <Text fontSize="sm" ml={2} fontWeight="bold">
                                            {x.state.toUpperCase()}
                                        </Text>
                                    </Flex>
                                    <Flex align="center">
                                        <Text mt={1} fontSize="sm" color="grey.300">
                                            {x.address}
                                        </Text>
                                        <Spacer />
                                        <Text fontSize="sm" color="grey.200">
                                            {formatDistance(x.createdAt, Date.now(), { addSuffix: true })}
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Box mb={2} />
                                {Array.from(x.cart.values()).map((e) => {
                                    return <TrackOrderItem key={e._id} _id={e._id} orderId={x._id} />
                                })}
                                <Flex
                                    justify="flex-end"
                                    fontWeight="bold"
                                    fontSize="xl"
                                    bg="secondary.300"
                                    mt={2}
                                    rounded="md"
                                >
                                    <Text my={1} px={2}>
                                        ${x.totalCost}
                                    </Text>
                                </Flex>
                            </Flex>
                        )
                    })}
                </Flex>
            </Flex>
            {selectedOrder && (
                <Flex flex={2} direction="column">
                    <Flex w="100%" h="50vh">
                        <GoogleMapReact
                            yesIWantToUseGoogleMapApiInternals
                            bootstrapURLKeys={{ key: 'AIzaSyDBaop0mN9naU3tMcWyNLjzHErLbTl9g8E' }}
                            defaultCenter={center}
                            center={center}
                            defaultZoom={zoom}
                            zoom={zoom}
                            options={mapTheme}
                            onGoogleApiLoaded={({ map, maps }) => setMap({ loaded: true, maps, map })}
                        >
                            {createPath()}
                            {selectedOrder.state === 'preparing' ? (
                                <PrepIcon lat={palefire.lat} lng={palefire.lng} />
                            ) : (
                                <BreweryIcon lat={palefire.lat} lng={palefire.lng} />
                            )}

                            {(selectedOrder.state === 'shipped' || selectedOrder.state === 'delivered') && (
                                <DroneIcon lat={38.4421179} lng={-78.8692451} />
                            )}
                            <DropoffIcon key="dropoff" lat={selectedOrder.lat} lng={selectedOrder.lng} />
                        </GoogleMapReact>
                    </Flex>
                    <Flex py={2} align="center" justify="flex-start" px={2} mt={4}>
                        {(selectedOrder.state === 'shipped' || selectedOrder.state === 'preparing') && (
                            <Lottie options={LottieConfig(LottieAnimations.BeerLottie)} height={108} width={80} />
                        )}
                        <Flex direction="column" flex={1}>
                            <Flex align="center" mb={1}>
                                <Badge>Order ID</Badge>
                                <Text ml={2} color="primary.100">
                                    {selectedOrder._id.split('-')[0]}
                                </Text>
                                <Spacer />
                            </Flex>
                            <Flex>
                                <Badge colorScheme="green" fontSize="lg">
                                    STATUS
                                </Badge>
                                <Text fontSize="lg" ml={2} fontWeight="bold">
                                    {selectedOrder.state.toUpperCase()}
                                </Text>
                            </Flex>
                            {(selectedOrder.state === 'shipped' || selectedOrder.state === 'preparing') && (
                                <Text mt={3} color="grey.300">
                                    Arriving in{' '}
                                    <Text as="span" fontWeight="bold" fontSize="2xl" color="white">
                                        {formatDistance(selectedOrder.estimated, new Date())}
                                    </Text>
                                </Text>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            )}
        </Flex>
    )
})

export default TrackOrder
