import {
    Box,
    Button,
    Flex,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Text,
} from '@chakra-ui/react'
import { getDistance } from 'geolib'
import GoogleMapReact from 'google-map-react'
import { observer } from 'mobx-react-lite'
import React, { useRef, useState } from 'react'
import { useStores } from '../store/root'
import { mapTheme } from '../theme/mapTheme'
import BreweryIcon from './common/BreweryIcon'
import DropoffIcon from './common/DropoffIcon'
import CartItem from './menu/CartItem'
import PlacesAutocomplete from './PlacesAutocomplete'

const Checkout = observer(() => {
    const { uiStore, cartStore, palefire, maxDistance, orderStore } = useStores()
    const [map, setMap] = useState({
        loaded: false,
        map: null,
        maps: null,
    })
    const polyLine = useRef(null)
    const polyCircle = useRef(null)
    const [dropGPS, setDrop] = useState({ lat: 38.431654, lng: -78.875996 })
    // const [dropGPS, setDrop] = useState(null)
    const [dragging, setDragging] = useState(false)
    const [far, setFar] = useState(false)
    const [distance, setDistance] = useState(0)
    const [center, setCenter] = useState(palefire)
    const [zoom, setZoom] = useState(15)

    const [info, setInfo] = useState({
        first: 'Mridul',
        last: 'Pareek',
        address: '127 S liberty St.',
        phone: '5405562335',
        zipcode: '22801',
    })
    // const [info, setInfo] = useState({
    //     first: '',
    //     last: '',
    //     address: '',
    //     phone: '',
    //     zipcode: '',
    // })

    const [screen, setScreen] = useState(0)

    function createPath() {
        if (map.loaded) {
            if (polyLine.current === null) {
                polyLine.current = new map.maps.Polyline({
                    strokeColor: '#ff6a00',
                    strokeOpacity: 1,
                    strokeWeight: 5,
                    path: [palefire, dropGPS], //decodedPolyline.geometry.coordinates
                })
            } else {
                polyLine.current.setOptions({
                    path: [palefire, dropGPS],
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

    function createCircle() {
        if (map.loaded && polyCircle.current === null && far) {
            polyCircle.current = new map.maps.Circle({
                strokeColor: '#ff6a00',
                strokeOpacity: 0.6,
                fillColor: '#FF0000',
                fillOpacity: 0.25,
                strokeWeight: 2,
                center: palefire,
                radius: maxDistance,
            })
        } else if (map.loaded && polyCircle.current && !far && polyCircle.current.strokeOpacity !== 0) {
            polyCircle.current.setOptions({
                strokeOpacity: 0,
                fillOpacity: 0,
            })
        } else if (map.loaded && polyCircle.current && far && polyCircle.current.strokeOpacity !== 0.6) {
            polyCircle.current.setOptions({
                strokeOpacity: 0.6,
                fillOpacity: 0.25,
            })
        }

        if (polyCircle.current !== null) polyCircle.current.setMap(map.map)
        return null
    }

    return (
        <Modal isOpen={uiStore.checkout} onClose={() => (uiStore.checkout = false)} size={screen === 0 ? '6xl' : '4xl'}>
            <ModalOverlay bg="rgba(0,0,0,.8)" />
            <ModalContent bg="secondary.200">
                <ModalHeader borderBottom="1px" borderColor="secondary.100">
                    <Flex align="center">
                        <Text>{screen === 0 ? 'Pick drop off' : 'Order Details'}</Text>
                        <Spacer />
                        {dropGPS && !far && (
                            <Text fontSize="md" fontWeight="normal" mr={10}>
                                <Text
                                    as="span"
                                    bg="primary.100"
                                    color="secondary.300"
                                    px={2}
                                    rounded="full"
                                    fontWeight="bold"
                                    ml={2}
                                >
                                    ETA
                                </Text>{' '}
                                {5 + Math.round(distance / 100)} mins
                            </Text>
                        )}
                        <ModalCloseButton size="lg" mt={1} />
                    </Flex>
                </ModalHeader>
                <ModalBody>
                    <Flex mt={4} overflow="hidden" direction="column" position="relative">
                        {screen === 0 && (
                            <Flex direction="column" h="500px">
                                <PlacesAutocomplete
                                    onSelect={(result) => {
                                        setCenter(result)
                                        setDrop(result)
                                        setZoom(16)
                                        const dist = getDistance(
                                            { latitude: palefire.lat, longitude: palefire.lng },
                                            { latitude: result.lat, longitude: result.lng },
                                        )
                                        setDistance(dist)
                                        if (dist > maxDistance) {
                                            if (!far) setFar(true)
                                        } else {
                                            if (far) setFar(false)
                                        }
                                    }}
                                />
                                <Flex
                                    rounded={8}
                                    flex={1}
                                    overflow="hidden"
                                    position="absolute"
                                    h="90%"
                                    w="100%"
                                    mt="50px"
                                >
                                    <GoogleMapReact
                                        yesIWantToUseGoogleMapApiInternals
                                        bootstrapURLKeys={{ key: 'AIzaSyDBaop0mN9naU3tMcWyNLjzHErLbTl9g8E' }}
                                        defaultCenter={center}
                                        center={center}
                                        defaultZoom={zoom}
                                        zoom={zoom}
                                        onChange={({ center, zoom }) => {
                                            if (center && center.lat) {
                                                setCenter(center)
                                            }
                                            if (zoom) {
                                                setZoom(zoom)
                                            }
                                        }}
                                        draggable={!dragging}
                                        onChildMouseDown={() => {
                                            setDragging(true)
                                        }}
                                        onChildMouseUp={() => setDragging(false)}
                                        onChildMouseMove={(key, childProps, mouse) => {
                                            if (key === 'dropoff') {
                                                setDrop({ lat: mouse.lat, lng: mouse.lng })
                                                const dist = getDistance(
                                                    { latitude: palefire.lat, longitude: palefire.lng },
                                                    { latitude: mouse.lat, longitude: mouse.lng },
                                                )
                                                setDistance(dist)
                                                // console.log(dist)
                                                console.log(dist > maxDistance)
                                                if (dist > maxDistance) {
                                                    if (!far) {
                                                        console.log('set far')
                                                        setFar(true)
                                                    }
                                                } else {
                                                    if (far) {
                                                        console.log('set close')
                                                        setFar(false)
                                                    }
                                                }
                                            }
                                        }}
                                        options={mapTheme}
                                        onGoogleApiLoaded={({ map, maps }) => setMap({ loaded: true, maps, map })}
                                    >
                                        <BreweryIcon lat={38.4481179} lng={-78.8721451} />
                                        {createPath()}
                                        {createCircle()}
                                        {dropGPS && (
                                            <DropoffIcon
                                                key="dropoff"
                                                far={far}
                                                lat={dropGPS.lat}
                                                lng={dropGPS.lng}
                                                draggable={true}
                                            />
                                        )}
                                    </GoogleMapReact>
                                </Flex>
                            </Flex>
                        )}
                        {screen === 1 && (
                            <Flex direction="column">
                                <Flex>
                                    <Input
                                        placeholder="First name"
                                        value={info.first}
                                        mr={2}
                                        onChange={(e) => setInfo({ ...info, first: e.target.value })}
                                    />
                                    <Input
                                        placeholder="Last name"
                                        value={info.last}
                                        ml={2}
                                        onChange={(e) => setInfo({ ...info, last: e.target.value })}
                                    />
                                </Flex>
                                <Input
                                    placeholder="Address"
                                    value={info.address}
                                    mt={4}
                                    onChange={(e) => setInfo({ ...info, address: e.target.value })}
                                />
                                <Flex mt={4}>
                                    <Input
                                        placeholder="Phone Number"
                                        type="number"
                                        value={info.phone}
                                        mr={2}
                                        onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                                    />
                                    <Input
                                        placeholder="Zipcode"
                                        type="number"
                                        ml={2}
                                        value={info.zipcode}
                                        onChange={(e) => setInfo({ ...info, zipcode: e.target.value })}
                                    />
                                </Flex>
                                <Flex direction="column" mt={4} borderTop="1px" borderColor="secondary.100">
                                    <Box mt={2} />
                                    {cartStore.array.map((x) => {
                                        return <CartItem key={x._id} _id={x._id} />
                                    })}
                                </Flex>
                                <Flex
                                    mt={2}
                                    direction="column"
                                    align="flex-end"
                                    borderTop="1px"
                                    borderColor="secondary.100"
                                >
                                    <Text mt={4}>Your Total</Text>
                                    <Text fontWeight="bold" fontSize="2xl">
                                        ${cartStore.totalCost}
                                    </Text>
                                </Flex>
                            </Flex>
                        )}
                    </Flex>
                </ModalBody>
                <ModalFooter mt={3} borderTop="1px" borderColor="secondary.100">
                    {screen > 0 && (
                        <Button onClick={() => setScreen(screen - 1)} bg="red.100" mr={4}>
                            Back
                        </Button>
                    )}
                    {screen === 0 && (
                        <Button onClick={() => setScreen(screen + 1)} bg="primary.100" disabled={!dropGPS}>
                            Continue
                        </Button>
                    )}
                    {screen === 1 && (
                        <Button
                            onClick={() => {
                                orderStore.add({
                                    list: cartStore.array,
                                    name: info.first + ' ' + info.last,
                                    phone: info.phone,
                                    place: {
                                        lat: dropGPS.lat,
                                        lng: dropGPS.lng,
                                    },
                                    address: info.address,
                                })
                                cartStore.cart.clear()
                            }}
                            bg="primary.100"
                            disabled={!cartStore.totalCost > 0}
                        >
                            Place Order
                        </Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
})

export default Checkout
