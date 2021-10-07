import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import useOnclickOutside from 'react-cool-onclickoutside'
import { Box, Text, Center, Flex, Image, Circle, Icon, Spacer, Button, Input } from '@chakra-ui/react'

const PlacesAutocomplete = ({ onSelect }) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            /* Define search scope here */
        },
        debounce: 300,
    })
    const ref = useOnclickOutside(() => {
        clearSuggestions()
    })

    const handleSelect =
        ({ description }) =>
        () => {
            setValue(description, false)
            clearSuggestions()

            getGeocode({ address: description })
                .then((results) => getLatLng(results[0]))
                .then(({ lat, lng }) => {
                    onSelect?.({ lat, lng })
                    console.log('📍 Coordinates: ', { lat, lng })
                })
                .catch((error) => {
                    console.log('😱 Error: ', error)
                })
        }

    const renderSuggestions = () => (
        <Flex direction="column" py={2} mx={2} rounded="lg" bg="rgba(20, 19, 22,.97)">
            {data.map((suggestion) => {
                const {
                    place_id,
                    structured_formatting: { main_text, secondary_text },
                } = suggestion

                return (
                    <Flex
                        key={place_id}
                        onClick={handleSelect(suggestion)}
                        zIndex={100}
                        align="center"
                        px={4}
                        py={2}
                        cursor="pointer"
                        _hover={{ bg: 'secondary.100' }}
                    >
                        <Text>{main_text}</Text>
                        <Text fontSize="sm" color="grey.300" ml={2}>
                            {secondary_text}
                        </Text>
                    </Flex>
                )
            })}
        </Flex>
    )

    return (
        <Flex ref={ref} mb={3} direction="column" zIndex={99}>
            <Input
                bg="secondary.200"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                placeholder="Look up your address..."
            />
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
            {status === 'OK' && <ul>{renderSuggestions()}</ul>}
        </Flex>
    )
}

export default PlacesAutocomplete
