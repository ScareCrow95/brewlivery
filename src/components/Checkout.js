import React, { useState, useEffect, useRef, Component } from 'react'
import GoogleMapReact from 'google-map-react'

import {
    Box,
    Text,
    Center,
    Flex,
    Image,
    Circle,
    Icon,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Button,
} from '@chakra-ui/react'
import PlacesAutocomplete from './PlacesAutocomplete'
import { observer } from 'mobx-react-lite'
import { useStores } from '../store/root'
const Checkout = observer(() => {
    const { uiStore } = useStores()
    const [map, setMap] = useState({
        loaded: false,
        map: null,
        maps: null,
    })
    const [center, setCenter] = useState({ lat: 38.446665, lng: -78.870214 })
    const [zoom, setZoom] = useState(15)

    return (
        <Modal isOpen={uiStore.checkout} onClose={() => (uiStore.checkout = false)} size="6xl">
            <ModalOverlay bg="rgba(0,0,0,.8)" />
            <ModalContent bg="secondary.200">
                <ModalHeader borderBottom="1px" borderColor="secondary.100">
                    <Text>Pick drop off</Text>
                    <ModalCloseButton />
                </ModalHeader>
                <ModalBody>
                    <Flex h="500px" mt={4} overflow="hidden" direction="column" position="relative">
                        <PlacesAutocomplete
                            onSelect={(result) => {
                                setCenter(result)
                                setZoom(18)
                            }}
                        />
                        <Flex rounded={8} flex={1} overflow="hidden" position="absolute" h="90%" w="100%" mt="50px">
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
                                options={{
                                    styles: [
                                        {
                                            featureType: 'all',
                                            elementType: 'geometry',
                                            stylers: [
                                                {
                                                    color: '#242f3e',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'all',
                                            elementType: 'labels.text.fill',
                                            stylers: [
                                                {
                                                    color: '#746855',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'all',
                                            elementType: 'labels.text.stroke',
                                            stylers: [
                                                {
                                                    color: '#242f3e',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'administrative.locality',
                                            elementType: 'labels.text.fill',
                                            stylers: [
                                                {
                                                    color: '#d59563',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'landscape.man_made',
                                            elementType: 'geometry.fill',
                                            stylers: [
                                                {
                                                    visibility: 'on',
                                                },
                                                {
                                                    color: '#1e2732',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'landscape.man_made',
                                            elementType: 'geometry.stroke',
                                            stylers: [
                                                {
                                                    visibility: 'off',
                                                },
                                                {
                                                    hue: '#ff0000',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'landscape.man_made',
                                            elementType: 'labels',
                                            stylers: [
                                                {
                                                    visibility: 'off',
                                                },
                                                {
                                                    hue: '#00ff24',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'landscape.man_made',
                                            elementType: 'labels.text',
                                            stylers: [
                                                {
                                                    visibility: 'on',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'landscape.man_made',
                                            elementType: 'labels.text.fill',
                                            stylers: [
                                                {
                                                    visibility: 'on',
                                                },
                                                {
                                                    color: '#ffffff',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'landscape.man_made',
                                            elementType: 'labels.text.stroke',
                                            stylers: [
                                                {
                                                    hue: '#76ff00',
                                                },
                                                {
                                                    visibility: 'off',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'landscape.man_made',
                                            elementType: 'labels.icon',
                                            stylers: [
                                                {
                                                    visibility: 'off',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'landscape.natural',
                                            elementType: 'all',
                                            stylers: [
                                                {
                                                    visibility: 'off',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'landscape.natural',
                                            elementType: 'geometry',
                                            stylers: [
                                                {
                                                    visibility: 'on',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'landscape.natural',
                                            elementType: 'geometry.fill',
                                            stylers: [
                                                {
                                                    visibility: 'on',
                                                },
                                                {
                                                    hue: '#00fffb',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'landscape.natural.landcover',
                                            elementType: 'all',
                                            stylers: [
                                                {
                                                    visibility: 'off',
                                                },
                                                {
                                                    hue: '#ff00df',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'landscape.natural.landcover',
                                            elementType: 'geometry.fill',
                                            stylers: [
                                                {
                                                    visibility: 'on',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'landscape.natural.landcover',
                                            elementType: 'geometry.stroke',
                                            stylers: [
                                                {
                                                    visibility: 'on',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'landscape.natural.landcover',
                                            elementType: 'labels',
                                            stylers: [
                                                {
                                                    visibility: 'on',
                                                },
                                                {
                                                    hue: '#0024ff',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'landscape.natural.landcover',
                                            elementType: 'labels.text.fill',
                                            stylers: [
                                                {
                                                    visibility: 'on',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'poi',
                                            elementType: 'labels.text.fill',
                                            stylers: [
                                                {
                                                    color: '#d59563',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'poi.park',
                                            elementType: 'geometry',
                                            stylers: [
                                                {
                                                    color: '#263c3f',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'poi.park',
                                            elementType: 'labels.text.fill',
                                            stylers: [
                                                {
                                                    color: '#6b9a76',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'road',
                                            elementType: 'geometry',
                                            stylers: [
                                                {
                                                    color: '#38414e',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'road',
                                            elementType: 'geometry.stroke',
                                            stylers: [
                                                {
                                                    color: '#212a37',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'road',
                                            elementType: 'labels.text.fill',
                                            stylers: [
                                                {
                                                    color: '#9ca5b3',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'road.highway',
                                            elementType: 'geometry',
                                            stylers: [
                                                {
                                                    color: '#746855',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'road.highway',
                                            elementType: 'geometry.stroke',
                                            stylers: [
                                                {
                                                    color: '#1f2835',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'road.highway',
                                            elementType: 'labels.text.fill',
                                            stylers: [
                                                {
                                                    color: '#f3d19c',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'transit',
                                            elementType: 'geometry',
                                            stylers: [
                                                {
                                                    color: '#2f3948',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'transit.station',
                                            elementType: 'labels.text.fill',
                                            stylers: [
                                                {
                                                    color: '#d59563',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'water',
                                            elementType: 'geometry',
                                            stylers: [
                                                {
                                                    color: '#17263c',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'water',
                                            elementType: 'labels.text.fill',
                                            stylers: [
                                                {
                                                    color: '#515c6d',
                                                },
                                            ],
                                        },
                                        {
                                            featureType: 'water',
                                            elementType: 'labels.text.stroke',
                                            stylers: [
                                                {
                                                    color: '#17263c',
                                                },
                                            ],
                                        },
                                    ],
                                }}
                                onGoogleApiLoaded={({ map, maps }) => setMap({ loaded: true, maps, map })}
                            ></GoogleMapReact>
                        </Flex>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button>Continue</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
})

export default Checkout
