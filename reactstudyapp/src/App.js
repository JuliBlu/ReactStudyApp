import React, { useState } from 'react';
import { ChakraProvider, Box, Drawer, DrawerBody, DrawerContent, DrawerHeader, Stack, Text, Icon } from '@chakra-ui/react';
import { FaHome, FaUser, FaMap, FaInfo, FaClipboard, FaMusic, FaLandmark, FaShoppingBag, FaQuestionCircle } from 'react-icons/fa'; // Import new icon for closing questionnaire
import View0InformedConcent from './View0InformedConcent';
import View1Demographics from './View1Demographics';
import View2TaskAccomodation from './View2TaskAccomodation';
import View3RatingsAccomodation from './View3RatingsAccomodation';
import View4TaskNaturalAttractions from './View4TaskNaturalAttractions';
import View5RatingsNaturalAttractions from './View5RatingsNaturalAttractions';
import View6TaskEntertainment from './View6TaskEntertainment';
import View7RatingsEntertainment from './View7RatingsEntertainment';
import View8TaskCulturalSites from './View8TaskCulturalSites';
import View9RatingsCulturalSites from './View9RatingsCulturalSites';
import View10TaskShopping from './View10TaskShopping';
import View11RatingsShopping from './View11RatingsShopping';
import View12ClosingQuestionnaire from './View12ClosingQuestionnaire'; // New view for closing questionnaire
import 'leaflet/dist/leaflet.css';

function App() {
    const [activeView, setActiveView] = useState('view0'); // Default to view0
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [poiDataList, setPOIDataList] = useState([]); // State to store POI data

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const switchView = (view) => {
        setActiveView(view);
    };

    const savePOIData = (originalTitle, adaptedPOI) => {
        setPOIDataList((prevData) => {
            const dataMap = new Map(prevData.map(item => [item.key, item.value]));
            dataMap.set(originalTitle, adaptedPOI);
            const updatedList = Array.from(dataMap, ([key, value]) => ({ key, value }));
            return updatedList;
        });
    };

    return (
        <ChakraProvider>
            <Box display="flex">
                <Drawer isOpen={isDrawerOpen} placement="left" width="200px" onClose={() => setIsDrawerOpen(false)} bg="#1D1F2B" color="#ffffff">
                    <DrawerContent>
                        <DrawerHeader>Survey</DrawerHeader>
                        <DrawerBody>
                            <Stack spacing={4}>
                                <Text
                                    onClick={() => {
                                        switchView('view0');
                                        setIsDrawerOpen(false);
                                    }}
                                    cursor="pointer"
                                    bg={activeView === 'view0' ? 'blue.100' : 'transparent'}
                                    borderRadius="md"
                                    padding="2"
                                    display="flex"
                                    alignItems="center"
                                >
                                    <Icon as={FaClipboard} marginRight="2" />
                                    Informed Consent
                                </Text>
                                <Text
                                    onClick={() => {
                                        switchView('view1');
                                        setIsDrawerOpen(false);
                                    }}
                                    cursor="pointer"
                                    bg={activeView === 'view1' ? 'blue.100' : 'transparent'}
                                    borderRadius="md"
                                    padding="2"
                                    display="flex"
                                    alignItems="center"
                                >
                                    <Icon as={FaHome} marginRight="2" />
                                    P1: Demographics
                                </Text>
                                <Text
                                    onClick={() => {
                                        switchView('view2');
                                        setIsDrawerOpen(false);
                                    }}
                                    cursor="pointer"
                                    bg={activeView === 'view2' ? 'blue.100' : 'transparent'}
                                    borderRadius="md"
                                    padding="2"
                                    display="flex"
                                    alignItems="center"
                                >
                                    <Icon as={FaMap} marginRight="2" />
                                    P2: Task
                                </Text>
                                <Text
                                    onClick={() => {
                                        switchView('view3');
                                        setIsDrawerOpen(false);
                                    }}
                                    cursor="pointer"
                                    bg={activeView === 'view3' ? 'blue.100' : 'transparent'}
                                    borderRadius="md"
                                    padding="2"
                                    display="flex"
                                    alignItems="center"
                                >
                                    <Icon as={FaUser} marginRight="2" />
                                    P3: Ratings
                                </Text>
                                <Text
                                    onClick={() => {
                                        switchView('view4');
                                        setIsDrawerOpen(false);
                                    }}
                                    cursor="pointer"
                                    bg={activeView === 'view4' ? 'blue.100' : 'transparent'}
                                    borderRadius="md"
                                    padding="2"
                                    display="flex"
                                    alignItems="center"
                                >
                                    <Icon as={FaMap} marginRight="2" />
                                    P4: Task
                                </Text>
                                <Text
                                    onClick={() => {
                                        switchView('view5');
                                        setIsDrawerOpen(false);
                                    }}
                                    cursor="pointer"
                                    bg={activeView === 'view5' ? 'blue.100' : 'transparent'}
                                    borderRadius="md"
                                    padding="2"
                                    display="flex"
                                    alignItems="center"
                                >
                                    <Icon as={FaUser} marginRight="2" />
                                    P5: Ratings
                                </Text>
                                <Text
                                    onClick={() => {
                                        switchView('view6');
                                        setIsDrawerOpen(false);
                                    }}
                                    cursor="pointer"
                                    bg={activeView === 'view6' ? 'blue.100' : 'transparent'}
                                    borderRadius="md"
                                    padding="2"
                                    display="flex"
                                    alignItems="center"
                                >
                                    <Icon as={FaMusic} marginRight="2" />
                                    P6: Task
                                </Text>
                                <Text
                                    onClick={() => {
                                        switchView('view7');
                                        setIsDrawerOpen(false);
                                    }}
                                    cursor="pointer"
                                    bg={activeView === 'view7' ? 'blue.100' : 'transparent'}
                                    borderRadius="md"
                                    padding="2"
                                    display="flex"
                                    alignItems="center"
                                >
                                    <Icon as={FaUser} marginRight="2" />
                                    P7: Ratings
                                </Text>
                                <Text
                                    onClick={() => {
                                        switchView('view8');
                                        setIsDrawerOpen(false);
                                    }}
                                    cursor="pointer"
                                    bg={activeView === 'view8' ? 'blue.100' : 'transparent'}
                                    borderRadius="md"
                                    padding="2"
                                    display="flex"
                                    alignItems="center"
                                >
                                    <Icon as={FaLandmark} marginRight="2" />
                                    P8: Task
                                </Text>
                                <Text
                                    onClick={() => {
                                        switchView('view9');
                                        setIsDrawerOpen(false);
                                    }}
                                    cursor="pointer"
                                    bg={activeView === 'view9' ? 'blue.100' : 'transparent'}
                                    borderRadius="md"
                                    padding="2"
                                    display="flex"
                                    alignItems="center"
                                >
                                    <Icon as={FaUser} marginRight="2" />
                                    P9: Ratings
                                </Text>
                                <Text
                                    onClick={() => {
                                        switchView('view10');
                                        setIsDrawerOpen(false);
                                    }}
                                    cursor="pointer"
                                    bg={activeView === 'view10' ? 'blue.100' : 'transparent'}
                                    borderRadius="md"
                                    padding="2"
                                    display="flex"
                                    alignItems="center"
                                >
                                    <Icon as={FaShoppingBag} marginRight="2" />
                                    P10: Task
                                </Text>
                                <Text
                                    onClick={() => {
                                        switchView('view11');
                                        setIsDrawerOpen(false);
                                    }}
                                    cursor="pointer"
                                    bg={activeView === 'view11' ? 'blue.100' : 'transparent'}
                                    borderRadius="md"
                                    padding="2"
                                    display="flex"
                                    alignItems="center"
                                >
                                    <Icon as={FaUser} marginRight="2" />
                                    P11: Ratings
                                </Text>
                                <Text
                                    onClick={() => {
                                        switchView('view12');
                                        setIsDrawerOpen(false);
                                    }}
                                    cursor="pointer"
                                    bg={activeView === 'view12' ? 'blue.100' : 'transparent'}
                                    borderRadius="md"
                                    padding="2"
                                    display="flex"
                                    alignItems="center"
                                >
                                    <Icon as={FaQuestionCircle} marginRight="2" />
                                    Closing Questionnaire
                                </Text>
                            </Stack>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
                <Box flexGrow={1} transform={isDrawerOpen ? 'translateX(200px)' : 'none'}>
                    {activeView === 'view0' && <View0InformedConcent switchView={switchView} toggleDrawer={toggleDrawer} />}
                    {activeView === 'view1' && <View1Demographics switchView={switchView} toggleDrawer={toggleDrawer} />}
                    {activeView === 'view2' && <View2TaskAccomodation savePOIData={savePOIData} switchView={switchView} toggleDrawer={toggleDrawer} />}
                    {activeView === 'view3' && <View3RatingsAccomodation poiDataList={poiDataList} switchView={switchView} toggleDrawer={toggleDrawer} />}
                    {activeView === 'view4' && <View4TaskNaturalAttractions savePOIData={savePOIData} switchView={switchView} toggleDrawer={toggleDrawer} />}
                    {activeView === 'view5' && <View5RatingsNaturalAttractions poiDataList={poiDataList} switchView={switchView} toggleDrawer={toggleDrawer} />}
                    {activeView === 'view6' && <View6TaskEntertainment savePOIData={savePOIData} switchView={switchView} toggleDrawer={toggleDrawer} />}
                    {activeView === 'view7' && <View7RatingsEntertainment poiDataList={poiDataList} switchView={switchView} toggleDrawer={toggleDrawer} />}
                    {activeView === 'view8' && <View8TaskCulturalSites savePOIData={savePOIData} switchView={switchView} toggleDrawer={toggleDrawer} />}
                    {activeView === 'view9' && <View9RatingsCulturalSites poiDataList={poiDataList} switchView={switchView} toggleDrawer={toggleDrawer} />}
                    {activeView === 'view10' && <View10TaskShopping savePOIData={savePOIData} switchView={switchView} toggleDrawer={toggleDrawer} />}
                    {activeView === 'view11' && <View11RatingsShopping poiDataList={poiDataList} switchView={switchView} toggleDrawer={toggleDrawer} />}
                    {activeView === 'view12' && <View12ClosingQuestionnaire switchView={switchView} toggleDrawer={toggleDrawer} />} {/* New closing questionnaire view */}
                </Box>
            </Box>
        </ChakraProvider>
    );
}

export default App;
