import React, { useState } from 'react';
import {
    ChakraProvider,
    Box,
    Button,
    Collapse,
    Flex,
    IconButton,
    Spacer,
    Text,
    Tooltip,
    VStack,
    Link as ChakraLink,
    useDisclosure,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useToast
} from '@chakra-ui/react';
import { FaHome, FaBars, FaDownload, FaTrash } from 'react-icons/fa';

function TopBar(props) {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const toast = useToast();

    const categories = [
        { color: 'blue', name: 'Accommodation' },
        { color: 'green', name: 'Natural Attractions' },
        { color: 'red', name: 'Entertainment' },
        { color: 'orange', name: 'Cultural and Historical Sites' },
        { color: 'teal', name: 'Commercial and Shopping' }
    ];

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const downloadJSON = () => {
        console.log(localStorage.getItem('formData'));
        const formData = JSON.parse(localStorage.getItem('formData') || '[]');
        const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    const clearLocalStorage = () => {
        localStorage.clear();
        toast({
            title: "Data Cleared",
            description: "All local storage data has been cleared.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        onClose();
    };

    // Get the current category from props
    const currentCategory = props.category || categories[0];

    return (
        <Flex
            p={4}
            bg="#2D3748"
            borderBottom="1px solid #4A5568"
            alignItems="center"
            position="sticky"
            top="0"
            zIndex="999"
            color="#F7FAFC"
        >
            <Button
                colorScheme="teal"
                variant="solid"
                color="#F7FAFC"
                bg="#38B2AC"
                _hover={{ bg: '#2C7A7B' }}
                _active={{ bg: '#285E61' }}
                leftIcon={<FaHome />}
                onClick={() => console.log("works")}
            >
                Survey
            </Button>
            <Text ml={10} fontWeight="bold" fontSize={"18pt"} color={"#F7FAFC"}>
                POI Recommendations Survey
            </Text>
            <Spacer />
            <Tooltip label={'Selected Category'} placement="top">
                <Button
                    colorScheme={currentCategory.color}
                    variant="solid"
                    mr={5}
                >
                    {currentCategory.name}
                </Button>
            </Tooltip>
            <Tooltip label={'Download JSON'} placement="top">
                <Button
                    colorScheme="teal"
                    variant="solid"
                    color="#F7FAFC"
                    bg="#38B2AC"
                    _hover={{ bg: '#2C7A7B' }}
                    _active={{ bg: '#285E61' }}
                    onClick={downloadJSON}
                    mr={5}
                    leftIcon={<FaDownload />}
                >
                    Download JSON
                </Button>
            </Tooltip>
            <Tooltip label={'Clear Local Storage'} placement="top">
                <Button
                    colorScheme="teal"
                    variant="solid"
                    color="#F7FAFC"
                    bg="#38B2AC"
                    _hover={{ bg: 'rgba(229, 62, 62, 0.1)' }}
                    _active={{ bg: 'rgba(229, 62, 62, 0.2)' }}
                    onClick={onOpen}
                    mr={5}
                >
                    Clear Data
                </Button>
            </Tooltip>
            <IconButton
                icon={<FaBars />}
                aria-label="Open Menu"
                colorScheme="teal"
                variant="solid"
                color="#F7FAFC"
                bg="#38B2AC"
                _hover={{ bg: '#2C7A7B' }}
                _active={{ bg: '#285E61' }}
                onClick={() => props.toggleDrawer()}
            />
            <Collapse in={props.isMenuOpen}>
                <Box
                    bg="#F7FAFC"
                    p={4}
                    position="absolute"
                    top="56px"
                    right="0"
                    shadow="md"
                    borderBottom="1px solid #CBD5E0"
                >
                    <VStack align="stretch" spacing={2}>
                        <Text
                            as="button"
                            onClick={() => {
                                closeMenu();
                            }}
                        >
                            <ChakraLink
                                href={"https://example.com/model-website"}
                                color="teal.500"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Model Website
                            </ChakraLink>
                        </Text>
                        <Text
                            as="button"
                            onClick={() => {
                                closeMenu();
                            }}
                        >
                            <ChakraLink
                                href={"https://example.com/model-demo"}
                                color="teal.500"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Model Demo
                            </ChakraLink>
                        </Text>
                    </VStack>
                </Box>
            </Collapse>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Clear Data
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                No
                            </Button>
                            <Button colorScheme="red" onClick={clearLocalStorage} ml={3}>
                                Yes
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Flex>
    );
}

export default TopBar;
