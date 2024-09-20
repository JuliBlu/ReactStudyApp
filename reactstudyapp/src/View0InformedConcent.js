import React, { useState } from 'react';
import { Box, Text, Button, Checkbox, VStack } from '@chakra-ui/react';
import TopBar from './TopBar';  // Import the TopBar component

function View0InformedConcent({ toggleDrawer, switchView }) {
    const [isChecked, setIsChecked] = useState(false); // State to track checkbox status

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked); // Update state based on checkbox status
    };

    return (
        <Box>
            <TopBar toggleDrawer={toggleDrawer} /> {/* Include TopBar at the top */}
            <Box padding="6" maxW="800px" margin="0 auto">
                <Text fontSize="3xl" mb="6" fontWeight="bold">Informed Consent Form</Text>
                <VStack bg="#e0e0e0" p={4} borderRadius="md" boxShadow="sm" align="start" spacing={4}>
                    <Text>
                        **Study Title**: Understanding User Interaction with Map-Based Surveys
                    </Text>

                    <Text>
                        **Principal Investigator**: Dr. Jane Doe, PhD
                    </Text>

                    <Text>
                        **Institution**: Department of Psychology, XYZ University
                    </Text>

                    <Text fontWeight="bold">Purpose of the Study</Text>
                    <Text>
                        You are invited to participate in a research study conducted by Dr. Jane Doe. The purpose of this study is to understand how users interact with map-based surveys and how they respond to questions related to demographics and other personal information.
                    </Text>

                    <Text fontWeight="bold">Procedures</Text>
                    <Text>
                        If you agree to participate, you will be asked to complete a survey that includes demographic questions and tasks involving interaction with a map. The survey will take approximately 15-20 minutes to complete. You may choose to withdraw from the study at any time without penalty.
                    </Text>

                    <Text fontWeight="bold">Risks</Text>
                    <Text>
                        The risks associated with this study are minimal. However, you may feel uncomfortable answering certain personal questions. You are free to skip any questions you do not wish to answer.
                    </Text>

                    <Text fontWeight="bold">Benefits</Text>
                    <Text>
                        While there may be no direct benefits to you, your participation will contribute to our understanding of user interaction with map-based surveys, which could improve future survey designs and user experience.
                    </Text>

                    <Text fontWeight="bold">Confidentiality</Text>
                    <Text>
                        Your responses will be kept confidential. Data will be stored securely and only the research team will have access to it. No personal identifiers will be included in the study reports.
                    </Text>

                    <Text fontWeight="bold">Voluntary Participation</Text>
                    <Text>
                        Your participation in this study is entirely voluntary. You may refuse to participate or withdraw at any time without any penalty or loss of benefits to which you are otherwise entitled.
                    </Text>

                    <Text fontWeight="bold">Contact Information</Text>
                    <Text>
                        If you have any questions about this study, you may contact Dr. Jane Doe at jane.doe@xyzuniversity.edu or (123) 456-7890.
                    </Text>

                    <Text>
                        If you have questions about your rights as a research participant, you may contact the XYZ University Institutional Review Board at irb@xyzuniversity.edu or (123) 456-7891.
                    </Text>

                    <Checkbox
                        isChecked={isChecked}
                        onChange={handleCheckboxChange}
                        borderColor={"black"}
                        
                    >
                        I have read and understood the information above, and I voluntarily agree to participate in this study.
                    </Checkbox>



                    <Button
                        colorScheme="blue"
                        mt="4"
                        onClick={() => switchView('view1')}
                        isDisabled={!isChecked}  // Disable the button if checkbox is not checked
                    >
                        Proceed to Survey
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
}

export default View0InformedConcent;
