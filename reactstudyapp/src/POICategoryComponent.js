import React, { useState, useEffect } from 'react';
import { Box, Text, Button, VStack, Spinner, Select } from '@chakra-ui/react'; // Import Select for dropdown
import TopBar from './TopBar';  // Import the TopBar component
import { getLLMResponse } from './llmService';  // Import the LLM service functions

const fetchPOIData = async () => {
    const response = await fetch('/poi_data.json');
    const data = await response.json();
    return data;
};

const getJsonData = () => {
    // Mock user profile data; replace with actual logic if available
    const formData = JSON.parse(localStorage.getItem('formData') || '[]');
    return formData;
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

        if (title && description) {
            return { title, description };
        } else {
            throw new Error("Missing title or description in LLM response.");
        }
    } catch (error) {
        console.error("Invalid JSON input or missing fields", error);
        return null;
    }
};

const generateAdaptedPOIs = async (pois) => {
    const demographics = getJsonData();
    const jsonString = JSON.stringify(demographics[0]);

    const updatedPOIs = await Promise.all(pois.map(async (poi) => {
        const promptData = `User_Profile = [${jsonString}]; POI = [Title: ${poi.title}, Description: ${poi.description}]`;
        const prompt = `Find a title and a description of the mentioned POI which is personalized to the user to make it more likely for them to visit the POI.`;
        const resultFormat = "Only Return the Result in JSON format, Don't add any other comments in the response.";
        const finalPrompt = `${promptData} ${prompt} ${resultFormat}`;

        const result = await getLLMResponse(finalPrompt);

        const adaptedPOI = parseResponse(result);

        if (adaptedPOI) {
            return { originalTitle: poi.title, adapted: [adaptedPOI.title, adaptedPOI.description] };
        } else {
            return { originalTitle: poi.title, adapted: ['Untitled', 'No description available'] };
        }
    }));

    return updatedPOIs;
};


function POICategoryComponent(props) {
    const [currentCategory, setCurrentCategory] = useState(props.category);
    const [selectedCategory, setSelectedCategory] = useState(props.category.name); // Default to first category
    const [updatedPOIs, setUpdatedPOIs] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const processPOIData = async () => {
            setIsLoading(true); 
            const data = await fetchPOIData();
            const categoryData = data.categories.find(cat => cat.name === selectedCategory);

            if (categoryData) {
                const adaptedPOIs = await generateAdaptedPOIs(categoryData.pois);
                setUpdatedPOIs(adaptedPOIs);
                
                adaptedPOIs.forEach(poi => {
                    const adaptedTitle = poi.adapted[0];
                    const adaptedDescription = poi.adapted[1];
                    props.savePOIData(poi.originalTitle, [adaptedTitle, adaptedDescription]);
                });
            }
            setIsLoading(false);
        };

        processPOIData();
    }, [selectedCategory]);

    return (
        <Box>
           <TopBar category={currentCategory} toggleDrawer={props.toggleDrawer}/>
            <Box padding="6" maxW="800px" margin="0 auto">
                <Text fontSize="3xl" mb="6" fontWeight="bold">Scenario and Task</Text>

                <VStack align="start" spacing={4}>
                    

                    <Box bg="#eeeeee" p={4} borderRadius="md" boxShadow="sm">
                        <Text fontSize="2xl" fontWeight="bold" mb={2}>
                            Points of Interest Rating
                        </Text>
                        <Text fontSize="md" color="gray.700">
                            The first Scenario and Task is x:
                        </Text>
                        {isLoading ? (
                            <Spinner size="lg" />
                        ) : (
                            updatedPOIs.map(poi => (
                                <Box key={poi.originalTitle} mb={4}>
                                    <Text fontSize="lg" fontWeight="bold">{poi.adapted[0]}</Text>
                                    <Text>{poi.adapted[1]}</Text>
                                </Box>
                            ))
                        )}
                    </Box>

                    <Button
                        colorScheme="blue"
                        mt="4"
                        onClick={() => props.switchView('view3')}
                        isDisabled={isLoading}
                    >
                        Proceed to Survey
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
}

export default POICategoryComponent;
