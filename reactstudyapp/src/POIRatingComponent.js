import React, { useState, useEffect } from 'react';
import {
    ChakraProvider,
    Box,
    Text,
    Image,
    Button,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Input,
    FormControl,
    FormLabel,
    Textarea,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel
} from '@chakra-ui/react';
import TopBar from './TopBar';

const fetchPOIData = async () => {
    const response = await fetch('/poi_data.json');
    const data = await response.json();
    return data;
};

function POIInfo({ marker, rating, setRating, onSubmit, isSubmitted }) {
    return (
        <Box
            width="100%"
            p={4}
            bg="#1D1F2B"
            color="white"
            height="calc(100vh - 300px)"
            display="flex"
            flexDirection="column"
            borderRadius="md"
            boxShadow="md"
        >
            <Box
                mb={4}
                height="200px"
                bg="gray.700"
                borderRadius="md"
                overflow="hidden"
                position="relative"
            >
                <Image
                    src="https://via.placeholder.com/500x200"
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
            {marker && (
                <>
                    <Box mt={4}>
                        <Text fontSize="md" mb={2}>Rate the interestingness of this POI:</Text>
                        <Slider
                            value={rating}
                            min={1}
                            max={10}
                            step={1}
                            onChange={(val) => setRating(val)}
                            isDisabled={isSubmitted}
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
                        isDisabled={isSubmitted || rating === null}
                    >
                        {isSubmitted ? 'Rating Submitted' : 'Submit Rating'}
                    </Button>
                </>
            )}
        </Box>
    );
}

function POIRatingComponent(props) {
    const [markers, setMarkers] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(props.category);
    const [tabIndex, setTabIndex] = useState(0);
    const [rightPOI, setRightPOI] = useState(null);
    const [adaptedPOI, setAdaptedPOI] = useState(null);
    const [formState, setFormState] = useState({
        question1: '',
        question2: '',
        question3: ''
    });
    const [isRigthAdapted, setIsRightAdapted] = useState(null);
    const [leftRating, setLeftRating] = useState(1);
    const [rightRating, setRightRating] = useState(1);
    const [leftSubmitted, setLeftSubmitted] = useState(false);
    const [rightSubmitted, setRightSubmitted] = useState(false);
    const [dataStructure, setDataStructure] = useState({
        Part1: {
            originalPOI: { name: '', description: '', interestingnessRating: null },
            adaptedPOI: { name: '', description: '', interestingnessRating: null },
            Q1: '',
            Q2: '',
            Q3: ''
        },
        Part2: {
            originalPOI: { name: '', description: '' },
            adaptedPOI: { name: '', description: '' },
            Q1: '',
            Q2: '',
            Q3: ''
        },
        Part3: {
            originalPOI: { name: '', description: '', interestingnessRating: null },
            adaptedPOI: { name: '', description: '', interestingnessRating: null }
        },
        Part4: {
            originalPOI: { name: '', description: '', interestingnessRating: null },
            adaptedPOI: { name: '', description: '', interestingnessRating: null },
            Q1: '',
            Q2: '',
            Q3: ''
        },
        Part5: {
            originalPOI: { name: '', description: '', interestingnessRating: null },
            adaptedPOI: { name: '', description: '', interestingnessRating: null },
            Q1: '',
            Q2: '',
            Q3: ''
        }
    });

    useEffect(() => {
        setTabIndex(0);
        updatePOIs(0);
    }, [currentCategory]);

    const updatePOIs = async (index) => {
        const data = await fetchPOIData();
        const category = data.categories.find(cat => cat.name === currentCategory.name);
        if (category) {
            setMarkers(category.pois);

            const isRightSide = Math.random() >= 0.5;
            setIsRightAdapted(isRightSide);
            const updatedMarkers = [...category.pois];

            const adaptedPOIUsed = getAdaptedPOI(updatedMarkers[index].title)
            setAdaptedPOI(adaptedPOIUsed);

            if (isRightSide) {
                setRightPOI(adaptedPOIUsed);
            } else {
                setRightPOI({ title: updatedMarkers[index].title, description: updatedMarkers[index].description });
                updatedMarkers[index] = adaptedPOIUsed;
                setMarkers(updatedMarkers);
            }
        } else {
            setMarkers([]);
            setTabIndex(null);
        }

        // Reset state for ratings and submissions when updating POIs
        setLeftRating(1);
        setRightRating(1);
        setLeftSubmitted(false);
        setRightSubmitted(false);
    };

    const getAdaptedPOI = (originalTitle) => {
        const matchedPOI = props.poiDataList.find(poi => poi.key === originalTitle);
        if (matchedPOI) {
            return {
                title: matchedPOI.value[0],
                description: matchedPOI.value[1]
            };
        }
        return { title: "Not Found", description: "No matching POI found." };
    };

    const handleLeftSubmit = () => {
        setLeftSubmitted(true);
        if(isRigthAdapted){
            saveDataPOI('originalPOI', leftRating);
        }else{ saveDataPOI('adaptedPOI', leftRating);}
    };

    const handleRightSubmit = () => {
        setRightSubmitted(true);
        if(isRigthAdapted){
            saveDataPOI('adaptedPOI', rightRating);
        }else{ saveDataPOI('originalPOI', rightRating);}
    };

    const saveDataPOI = (poiType, rating) => {
        const updatedData = { ...dataStructure };
        const part = `Part${tabIndex + 1}`;
        
        if (poiType === 'originalPOI' && rating !== undefined) {
            updatedData[part][poiType].interestingnessRating = rating;
            updatedData[part][poiType].name = markers[tabIndex].title;
            updatedData[part][poiType].description = markers[tabIndex].description;
        } else if (poiType === 'adaptedPOI' && rating !== undefined) {
            updatedData[part][poiType].interestingnessRating = rating;
            updatedData[part][poiType].name = adaptedPOI.title;
            updatedData[part][poiType].description = adaptedPOI.description;
        } 

        setDataStructure(updatedData);
        console.log(dataStructure)
    };

    const saveDataQuestions = () => {
        const updatedData = { ...dataStructure };
        const part = `Part${tabIndex + 1}`;
        
        updatedData[part]['Q1'] = formState.question1;
        updatedData[part]['Q2'] = formState.question2;
        updatedData[part]['Q3'] = formState.question3;

        setDataStructure(updatedData);
        console.log(dataStructure)
    };

    const handleProceed = () => {
        // Save the general questions before proceeding
        saveDataQuestions();

        if (tabIndex < markers.length - 1) {
            setTabIndex(tabIndex + 1);
            window.scrollTo(0, 0);
            setFormState({
                question1: '',
                question2: '',
                question3: ''
            });
            updatePOIs(tabIndex + 1);
        } else {
            // Handle transition to the next view
            // props.transitionToNextView();
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <ChakraProvider>
            <TopBar category={currentCategory} toggleDrawer={props.toggleDrawer}/>
            
            <Box textAlign="center" mb={6} mt={6}>
                <Text fontSize="4xl" fontWeight="bold">
                    Evaluating POI ({tabIndex + 1}/{markers.length}) - Category: {currentCategory.name}
                </Text>
            </Box>

            <Box
                display="flex"
                justifyContent="center"
                alignItems="flex-start"
                mt={4}
                mb={10}
            >
                <Tabs index={tabIndex} variant="enclosed">
                    <TabList>
                        {markers.map((poi, index) => (
                            <Tab 
                                key={poi.id} 
                                style={{ pointerEvents: 'none' }}
                            >
                                POI {index + 1}
                            </Tab>
                        ))}
                    </TabList>

                    <TabPanels>
                        {markers.map((poi, index) => (
                            <TabPanel key={poi.id}>
                                <Box display="flex" justifyContent="center" alignItems="flex-start">
                                    <POIInfo
                                        marker={poi}
                                        rating={leftRating}
                                        setRating={setLeftRating}
                                        onSubmit={handleLeftSubmit}
                                        isSubmitted={leftSubmitted}
                                    />
                                    <Box width="5%" />
                                    <POIInfo
                                        marker={index === tabIndex ? rightPOI : poi}
                                        rating={rightRating}
                                        setRating={setRightRating}
                                        onSubmit={handleRightSubmit}
                                        isSubmitted={rightSubmitted}
                                    />
                                </Box>
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </Box>

            <Box
                width="90%"
                p={4}
                bg="gray.100"
                color="black"
                borderRadius="md"
                boxShadow="md"
                mt={4}
                mx="auto"
            >
                <FormControl mb={4}>
                    <FormLabel>Question 1</FormLabel>
                    <Input 
                        placeholder="Enter your answer"
                        name="question1"
                        value={formState.question1}
                        onChange={handleInputChange} 
                    />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel>Question 2</FormLabel>
                    <Input 
                        type="text"
                        placeholder="Enter your answer"
                        name="question2"
                        value={formState.question2}
                        onChange={handleInputChange} 
                    />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel>Question 3</FormLabel>
                    <Textarea 
                        placeholder="Your answer here"
                        name="question3"
                        value={formState.question3}
                        onChange={handleInputChange} 
                    />
                </FormControl>
                <Button
                    width="100%"
                    colorScheme="blue"
                    mt={4}
                    onClick={handleProceed}
                    isDisabled={!leftSubmitted || !rightSubmitted}
                >
                    {tabIndex < markers.length - 1 ? 'Next POI' : 'Proceed to Next View'}
                </Button>
            </Box>
        </ChakraProvider>
    );
}

export default POIRatingComponent;
