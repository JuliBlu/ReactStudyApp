import React, { useState, useEffect } from 'react';
import {
    ChakraProvider,
    Box,
    Text,
    VStack,
    Image,
    Button,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb
} from '@chakra-ui/react';
import TopBar from './TopBar';
import MapView from './MapView';
import { getLLMResponse } from './llmService';

const fetchPOIData = async () => {
    const response = await fetch('/poi_data.json');
    const data = await response.json();
    return data;
};

function Sidebar({ marker, rating, setRating, onSubmit }) {
    return (
        <Box
            width="30%"
            p={4}
            bg="#1D1F2B"
            color="white"
            height="100vh"
            display="flex"
            flexDirection="column"
            mt={0}
        >
            <Box
                mb={4}
                height="200px"
                bg="gray.700"
                borderRadius="md"
                overflow="hidden"
                position="relative"
                mt={4}
            >
                <Image
                    src="https://via.placeholder.com/500x200"
                    alt="Sidebar Image"
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
                    {marker ? marker.title : 'Select a Marker'}
                </Text>
            </Box>
            <Text mt={4} fontSize="md">
                {marker ? marker.description : 'Click on a marker to see details here.'}
            </Text>
            {marker && (
                <>
                    <Box mt={4}>
                        <Text fontSize="md" mb={2}>Rate the interestingness of this POI:</Text>
                        <Slider
                            defaultValue={1}
                            min={1}
                            max={10}
                            step={1}
                            onChange={(val) => setRating(val)}
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                        <Text fontSize="sm" color="gray.400">{rating}</Text>
                    </Box>
                    <Button
                        mt={4}
                        colorScheme="blue"
                        onClick={onSubmit}
                        isDisabled={rating === null}
                    >
                        Submit Rating
                    </Button>
                </>
            )}
        </Box>
    );
}

function View2(props) {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [rating, setRating] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [currentCategory, setCurrentCategory] = useState({ color: 'blue', name: 'Accommodation' });

    useEffect(() => {
        const loadPOIData = async () => {
            const data = await fetchPOIData();
            const category = data.categories.find(cat => cat.name === currentCategory.name);
            if (category) {
                setMarkers(category.pois);
            } else {
                setMarkers([]);
            }
        };
        loadPOIData();
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [currentCategory]);

    const handleMarkerClick = async (marker) => {
        setSelectedMarker(marker);
        setRating(null);

        const demographics = getJsonData();
        const jsonString = JSON.stringify(demographics[0]);
        const promptData = `User_Profile = [${jsonString}]; POI = [Title: ${marker.title}, Description: ${marker.description}]`;
        const prompt = `Find a title and a description of the mentioned POI which is personalized to the user to make it more likely for them to visit the POI.`;
        const resultFormat = "Only Return the Result in JSON format, Don't add any other comments in the response.";

        const finalPrompt = `${promptData} ${prompt} ${resultFormat}`;
        console.log("Prompt = " + finalPrompt);
        //const result = await getLLMResponse(finalPrompt);
        //console.log('LLM Response:', result);
        //const result2 = parseResponse(result);
        //console.log(result2.title);
        //console.log(result2.description);
        //marker.title = result2.title;
        //marker.description = result2.description;
    };

    const parseResponse = (inputString) => {
        try {
            const jsonObj = JSON.parse(inputString);
            const normalizedObj = {};
            for (const key in jsonObj) {
                if (jsonObj.hasOwnProperty(key)) {
                    normalizedObj[key.toLowerCase()] = jsonObj[key];
                }
            }
            const title = normalizedObj['title'];
            const description = normalizedObj['description'];
            return { title, description };
        } catch (error) {
            console.error("Invalid JSON input", error);
            return null;
        }
    };

    const getJsonData = () => {
        const formData = JSON.parse(localStorage.getItem('formData') || '[]');
        return formData;
    };

    const handleSubmit = () => {
        if (selectedMarker && rating !== null) {
            const ratingData = {
                poiId: selectedMarker.id,
                rating: rating,
                timestamp: new Date().toISOString()
            };

            // Retrieve existing data from localStorage
            const existingData = JSON.parse(localStorage.getItem('formData') || '[]');
            if (existingData.length > 0) {
                const userProfile = existingData[existingData.length - 1]; // Get the last user's profile

                if (!userProfile.ratings) {
                    userProfile.ratings = {
                        culturalAndHistoricalSites: [],
                        commercialAndShopping: [],
                        accommodation: [],
                        naturalAttractions: [],
                        entertainment: []
                    };
                }
            
                // Add the rating data to the respective category
                userProfile.ratings[currentCategory.name.toLowerCase().replace(/ /g, '')].push(ratingData);
                
                localStorage.setItem('formData', JSON.stringify(existingData)); // Save the updated profiles back to localStorage
            }

            setMarkers(prevMarkers => prevMarkers.filter(marker => marker.id !== selectedMarker.id));
            setSelectedMarker(null);
            setRating(null);
        }
    };

    return (
        <ChakraProvider>
            <TopBar toggleDrawer={props.toggleDrawer} setCategory={setCurrentCategory} />
            <Box display="flex" height="calc(100vh - 56px)" overflow="hidden">
                <Sidebar
                    marker={selectedMarker}
                    rating={rating}
                    setRating={setRating}
                    onSubmit={handleSubmit}
                />
                <Box width="70%" height="100%">
                    <MapView markers={markers} onMarkerClick={handleMarkerClick} />
                </Box>
            </Box>
        </ChakraProvider>
    );
}

export default View2;
