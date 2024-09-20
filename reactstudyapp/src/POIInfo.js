import React from 'react';
import { Box, Text, Image, Button, Checkbox, Flex, Stack } from '@chakra-ui/react';

function POIInfo({ marker, values, handleValueChange, onSubmit, isSubmitted }) {
    // Function to validate if at least one checkbox from each section is checked
    const validateForm = () => {

        return ['value', 'trustworthiness', 'clarity', 'meetsExpectations'].every(
            (section) => values[section] !== '' && values[section] !== undefined
        );
    };

    return (
        <Box width="600px">
            <Box
                p={4}
                bg="#1D1F2B"
                color="white"
                height="100%"
                display="flex"
                flexDirection="column"
                borderRadius="md"
                boxShadow="md"
            >
                <Box
                    mb={4}
                    height="250px"
                    bg="gray.700"
                    borderRadius="md"
                    overflow="hidden"
                    position="relative"
                >
                    <Image
                        src={marker.imagesrc}
                        alt="POI Image"
                        objectFit="cover"
                        width="100%"
                        height="100%"
                    />
                    <Text
                        position="absolute"
                        bottom="0"
                        left="0"
                        p={4}
                        fontSize="xl"
                        fontWeight="bold"
                        bg="rgba(0, 0, 0, 0.6)"
                        color="white"
                    >
                        {marker ? marker.title : 'Select a POI'}
                    </Text>
                </Box>
                <Text mt={4} fontSize="md">
                    {marker ? marker.description : 'Select a POI to see details here.'}
                </Text>
            </Box>

            {marker && (
                <Box mt={6} p={4} bg="#2D2F3B" borderRadius="md" boxShadow="md">
                    <Text fontSize="large" color="white">POI Rating</Text>

                    <Stack spacing={6} mt={4}>
                        <Box>
                            <Text fontSize="md" color="white" mb={2}>Value and Services:</Text>
                            <Text fontSize="sm" color="gray.400" mb={2}>
                                The description effectively communicates the significance and offerings of the place.
                            </Text>
                            <Flex direction="row" justify="space-between" mb={4}>
                                {['1', '2', '3', '4', '5'].map(value => (
                                    <Box key={value} textAlign="center">
                                        <Checkbox
                                            isChecked={values.value === value}
                                            onChange={() => handleValueChange('value', value)}
                                            colorScheme="blue"
                                            sx={{ 
                                                '& .chakra-checkbox__control': {
                                                    bg: 'gray.700',
                                                    borderColor: 'gray.600',
                                                },
                                                '& .chakra-checkbox__label': {
                                                    color: 'white',
                                                }
                                            }}
                                        />
                                        <Text fontSize="xs" color="white" mt={1}>
                                            {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'][value - 1]}
                                        </Text>
                                    </Box>
                                ))}
                            </Flex>
                        </Box>

                        <Box>
                            <Text fontSize="md" color="white" mb={2}>Trustworthiness:</Text>
                            <Text fontSize="sm" color="gray.400" mb={2}>
                                I trust that this description provides accurate and reliable information about the place.
                            </Text>
                            <Flex direction="row" justify="space-between" mb={4}>
                                {['1', '2', '3', '4', '5'].map(value => (
                                    <Box key={value} textAlign="center">
                                        <Checkbox
                                            isChecked={values.trustworthiness === value}
                                            onChange={() => handleValueChange('trustworthiness', value)}
                                            colorScheme="blue"
                                            sx={{ 
                                                '& .chakra-checkbox__control': {
                                                    bg: 'gray.700',
                                                    borderColor: 'gray.600',
                                                },
                                                '& .chakra-checkbox__label': {
                                                    color: 'white',
                                                }
                                            }}
                                        />
                                        <Text fontSize="xs" color="white" mt={1}>
                                            {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'][value - 1]}
                                        </Text>
                                    </Box>
                                ))}
                            </Flex>
                        </Box>

                        <Box>
                            <Text fontSize="md" color="white" mb={2}>Clarity and Completeness:</Text>
                            <Text fontSize="sm" color="gray.400" mb={2}>
                                The description is clear and easy to understand without omitting important details.
                            </Text>
                            <Flex direction="row" justify="space-between" mb={4}>
                                {['1', '2', '3', '4', '5'].map(value => (
                                    <Box key={value} textAlign="center">
                                        <Checkbox
                                            isChecked={values.clarity === value}
                                            onChange={() => handleValueChange('clarity', value)}
                                            colorScheme="blue"
                                            sx={{ 
                                                '& .chakra-checkbox__control': {
                                                    bg: 'gray.700',
                                                    borderColor: 'gray.600',
                                                },
                                                '& .chakra-checkbox__label': {
                                                    color: 'white',
                                                }
                                            }}
                                        />
                                        <Text fontSize="xs" color="white" mt={1}>
                                            {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'][value - 1]}
                                        </Text>
                                    </Box>
                                ))}
                            </Flex>
                        </Box>

                        <Box>
                            <Text fontSize="md" color="white" mb={2}>Meets Expectations (optional):</Text>
                            <Text fontSize="sm" color="gray.400" mb={2}>
                                The description aligns with my expectations of what the POI should offer.
                            </Text>
                            <Flex direction="row" justify="space-between" mb={4}>
                                {['1', '2', '3', '4', '5'].map(value => (
                                    <Box key={value} textAlign="center">
                                        <Checkbox
                                            isChecked={values.meetsExpectations === value}
                                            onChange={() => handleValueChange('meetsExpectations', value)}
                                            colorScheme="blue"
                                            sx={{ 
                                                '& .chakra-checkbox__control': {
                                                    bg: 'gray.700',
                                                    borderColor: 'gray.600',
                                                },
                                                '& .chakra-checkbox__label': {
                                                    color: 'white',
                                                }
                                            }}
                                        />
                                        <Text fontSize="xs" color="white" mt={1}>
                                            {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'][value - 1]}
                                        </Text>
                                    </Box>
                                ))}
                            </Flex>
                        </Box>
                    </Stack>

                    <Button
                        mt={4}
                        colorScheme="blue"
                        onClick={onSubmit}
                        isDisabled={isSubmitted || !validateForm()}
                    >
                        {isSubmitted ? 'Rating Submitted' : 'Submit Rating'}
                    </Button>
                </Box>
            )}
        </Box>
    );
}

export default POIInfo;
