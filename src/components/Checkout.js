import React, { useState, useEffect, useRef, Component } from 'react'
import GoogleMapReact from 'google-map-react'
import { getDistance } from 'geolib'

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
import { IoBeer } from 'react-icons/io5'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { useStores } from '../store/root'
const palefire = { lat: 38.4481179, lng: -78.8721451 }
const Checkout = observer(() => {
    const { uiStore } = useStores()
    const [map, setMap] = useState({
        loaded: false,
        map: null,
        maps: null,
    })
    const polyLine = useRef(null)
    const polyCircle = useRef(null)
    const [dropGPS, setDrop] = useState(null)
    const [dragging, setDragging] = useState(false)
    const [far, setFar] = useState(false)
    const PalefireIcon = () => {
        return (
            <Flex direction="column" align="center" mt="-50px">
                <Flex>
                    <Text fontSize="md" bg="secondary.200" px={3} py={1} mb={1} rounded="full">
                        Brewlivery
                    </Text>
                </Flex>
                <Center boxSize={10} rounded="full" bg="primary.100" boxShadow="2px 2px 10px #0d0c0e">
                    <IoBeer size={20} />
                </Center>
            </Flex>
        )
    }

    const DropoffIcon = () => {
        return (
            <Flex direction="column" align="center">
                <Flex bg="secondary.200" px={3} py={1} mb={1} rounded="full" w="90px" mt="-50px" justify="center">
                    <Text fontSize="md" shrink={0}>
                        {far ? 'Too Far' : 'Drop off'}
                    </Text>
                </Flex>
                <Center boxSize={10} rounded="full" bg={far ? 'red.100' : 'green.100'} boxShadow="2px 2px 10px #0d0c0e">
                    <FaMapMarkerAlt size={20} />
                </Center>
            </Flex>
        )
    }

    const [center, setCenter] = useState(palefire)
    const [zoom, setZoom] = useState(15)

    function createPath() {
        if (dropGPS) {
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
                radius: 1000,
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
                                setDrop(result)
                                setZoom(16)
                                if (
                                    getDistance(
                                        { latitude: palefire.lat, longitude: palefire.lng },
                                        { latitude: result.lat, longitude: result.lng },
                                    ) > 200
                                ) {
                                    if (!far) setFar(true)
                                } else {
                                    if (far) setFar(false)
                                }
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
                                draggable={!dragging}
                                onChildMouseDown={() => {
                                    setDragging(true)
                                }}
                                onChildMouseUp={() => setDragging(false)}
                                onChildMouseMove={(key, childProps, mouse) => {
                                    if (key === 'dropoff') {
                                        setDrop({ lat: mouse.lat, lng: mouse.lng })
                                        if (
                                            getDistance(
                                                { latitude: palefire.lat, longitude: palefire.lng },
                                                { latitude: mouse.lat, longitude: mouse.lng },
                                            ) > 1000
                                        ) {
                                            if (!far) {
                                                setFar(true)
                                            }
                                        } else {
                                            if (far) {
                                                setFar(false)
                                            }
                                        }
                                    }
                                }}
                                options={{
                                    styles: [
                                        {
                                            featureType: 'all',
                                            elementType: 'geometry',
                                            stylers: [
                                                {
                                                    color: '#262626',
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
                                                    color: '#2d2d2d',
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
                            >
                                <PalefireIcon lat={38.4481179} lng={-78.8721451} />
                                {createPath()}
                                {createCircle()}
                                {dropGPS && (
                                    <DropoffIcon key="dropoff" lat={dropGPS.lat} lng={dropGPS.lng} draggable={true} />
                                )}
                            </GoogleMapReact>
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
