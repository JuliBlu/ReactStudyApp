import React, { useState } from 'react';
import {
    ChakraProvider,
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Textarea,
    VStack,
    Text
} from '@chakra-ui/react';
import TopBar from './TopBar';

function View1Demographics(props) {
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        nationality: '',
        maritalStatus: '',
        children: '',
        educationLevel: '',
        occupation: '',
        healthLevels: '',
        disabilities: '',
        politicalAffiliation: '',
        religiousAffiliation: '',
        hobbies: '',
        sports: '',
        language: '',
        pets: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        // Generate a new ID
        const id = new Date().toISOString();
        
        // Create a new user profile with ratings
        const newUserProfile = {
            id,
            ...formData,
            ratings: {
                culturalandhistoricalsites: [],
                commercialandshopping: [],
                accommodation: [],
                naturalattractions: [],
                entertainment: []
            }
        };

        // Retrieve existing data
        const existingData = JSON.parse(localStorage.getItem('formData') || '[]');
        
        // Append new user profile
        existingData.push(newUserProfile);

        // Save back to localStorage
        localStorage.setItem('formData', JSON.stringify(existingData));
        
        // Clear form data
        setFormData({
            age: '',
            gender: '',
            nationality: '',
            maritalStatus: '',
            children: '',
            educationLevel: '',
            occupation: '',
            healthLevels: '',
            disabilities: '',
            politicalAffiliation: '',
            religiousAffiliation: '',
            hobbies: '',
            sports: '',
            language: '',
            pets: '',
        });

        // Switch to View 2
        props.switchView('view2');
    };

    return (
        <ChakraProvider>
            <TopBar toggleDrawer={props.toggleDrawer} />
            <Box bg="#f0f0f0" p={6} minHeight="100vh">
                <VStack spacing={4} align="stretch">

                    <Box bg="white" p={4} borderRadius="md" boxShadow="sm">
                        <Text fontSize="2xl" fontWeight="bold" mb={2}>
                            Demographic Information
                        </Text>
                        <Text fontSize="md" color="gray.700">
                            We are collecting demographic information to better understand the diversity of participants in our study. This data will help us analyze the results more accurately and ensure that our findings are representative of different groups. Please rest assured that all your information will be kept confidential and used only for research purposes.
                        </Text>
                    </Box>

                    <FormControl>
                        <FormLabel>Age</FormLabel>
                        <Input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            borderColor="gray.400"
                            _hover={{ borderColor: 'gray.600' }}
                            _focus={{ borderColor: 'gray.600' }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Gender</FormLabel>
                        <Select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            borderColor="gray.400"
                            _hover={{ borderColor: 'gray.600' }}
                            _focus={{ borderColor: 'gray.600' }}
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="non-binary">Non-binary</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Nationality</FormLabel>
                        <Input
                            type="text"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleChange}
                            borderColor="gray.400"
                            _hover={{ borderColor: 'gray.600' }}
                            _focus={{ borderColor: 'gray.600' }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Marital Status</FormLabel>
                        <Select
                            name="maritalStatus"
                            value={formData.maritalStatus}
                            onChange={handleChange}
                            borderColor="gray.400"
                            _hover={{ borderColor: 'gray.600' }}
                            _focus={{ borderColor: 'gray.600' }}
                        >
                            <option value="">Select status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="divorced">Divorced</option>
                            <option value="widowed">Widowed</option>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Children</FormLabel>
                        <Input
                            type="text"
                            name="children"
                            value={formData.children}
                            onChange={handleChange}
                            borderColor="gray.400"
                            _hover={{ borderColor: 'gray.600' }}
                            _focus={{ borderColor: 'gray.600' }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Education Level</FormLabel>
                        <Select
                            name="educationLevel"
                            value={formData.educationLevel}
                            onChange={handleChange}
                            borderColor="gray.400"
                            _hover={{ borderColor: 'gray.600' }}
                            _focus={{ borderColor: 'gray.600' }}
                        >
                            <option value="">Select level</option>
                            <option value="high-school">High School</option>
                            <option value="associate">Associate Degree</option>
                            <option value="bachelor">Bachelor's Degree</option>
                            <option value="master">Master's Degree</option>
                            <option value="doctorate">Doctorate</option>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Occupation</FormLabel>
                        <Input
                            type="text"
                            name="occupation"
                            value={formData.occupation}
                            onChange={handleChange}
                            borderColor="gray.400"
                            _hover={{ borderColor: 'gray.600' }}
                            _focus={{ borderColor: 'gray.600' }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Health Levels</FormLabel>
                        <Textarea
                            name="healthLevels"
                            value={formData.healthLevels}
                            onChange={handleChange}
                            borderColor="gray.400"
                            _hover={{ borderColor: 'gray.600' }}
                            _focus={{ borderColor: 'gray.600' }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Disabilities/Accessibility</FormLabel>
                        <Textarea
                            name="disabilities"
                            value={formData.disabilities}
                            onChange={handleChange}
                            borderColor="gray.400"
                            _hover={{ borderColor: 'gray.600' }}
                            _focus={{ borderColor: 'gray.600' }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Political Affiliation</FormLabel>
                        <Input
                            type="text"
                            name="politicalAffiliation"
                            value={formData.politicalAffiliation}
                            onChange={handleChange}
                            borderColor="gray.400"
                            _hover={{ borderColor: 'gray.600' }}
                            _focus={{ borderColor: 'gray.600' }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Religious Affiliation</FormLabel>
                        <Input
                            type="text"
                            name="religiousAffiliation"
                            value={formData.religiousAffiliation}
                            onChange={handleChange}
                            borderColor="gray.400"
                            _hover={{ borderColor: 'gray.600' }}
                            _focus={{ borderColor: 'gray.600' }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Hobbies</FormLabel>
                        <Textarea
                            name="hobbies"
                            value={formData.hobbies}
                            onChange={handleChange}
                            borderColor="gray.400"
                            _hover={{ borderColor: 'gray.600' }}
                            _focus={{ borderColor: 'gray.600' }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Sports</FormLabel>
                        <Textarea
                            name="sports"
                            value={formData.sports}
                            onChange={handleChange}
                            borderColor="gray.400"
                            _hover={{ borderColor: 'gray.600' }}
                            _focus={{ borderColor: 'gray.600' }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Language</FormLabel>
                        <Input
                            type="text"
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            borderColor="gray.400"
                            _hover={{ borderColor: 'gray.600' }}
                            _focus={{ borderColor: 'gray.600' }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Pets</FormLabel>
                        <Input
                            type="text"
                            name="pets"
                            value={formData.pets}
                            onChange={handleChange}
                            borderColor="gray.400"
                            _hover={{ borderColor: 'gray.600' }}
                            _focus={{ borderColor: 'gray.600' }}
                        />
                    </FormControl>

                    <Button colorScheme="blue" onClick={handleSubmit}>
                        Submit and Proceed
                    </Button>
                </VStack>
            </Box>
        </ChakraProvider>
    );
}

export default View1Demographics;
