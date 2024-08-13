// View3.js
import React, { useEffect, useState } from 'react';
import { Box, Text, Button, ChakraProvider, Spinner } from '@chakra-ui/react';
import TopBar from './TopBar';
import Groq from 'groq-sdk';

// Initialize Groq SDK
const groq = new Groq({ apiKey: process.env.REACT_APP_GROQ_API_KEY, dangerouslyAllowBrowser: true });

const fetchChatCompletion = async () => {
    try {
        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: "Explain the importance of fast language models",
                },
            ],
            model: "llama3-8b-8192",
        });
        return response.choices[0]?.message?.content || "No content available";
    } catch (error) {
        console.error("Error fetching chat completion:", error);
        return "Error fetching data";
    }
};

const View12ClosingQuestionnaire = (props) => {
    const [chatContent, setChatContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getChatContent = async () => {
            const content = await fetchChatCompletion();
            setChatContent(content);
            setLoading(false);
        };

        getChatContent();
    }, []);

    return (
        <ChakraProvider>
            <TopBar toggleDrawer={props.toggleDrawer} />
            <Box p={4}>
                <Text fontSize="xl">P3: Additional Information</Text>
                {loading ? (
                    <Spinner />
                ) : (
                    <Text mt={4}>{chatContent}</Text>
                )}
                <Button onClick={props.toggleDrawer} mt={4}>
                    Toggle Drawer
                </Button>
            </Box>
        </ChakraProvider>
    );
};

export default View12ClosingQuestionnaire;
