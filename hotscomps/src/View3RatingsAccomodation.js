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
import POIRatingComponent from './POIRatingComponent';

function View3RatingsAccomodation(props) {
    
    return (
        <ChakraProvider>
           <POIRatingComponent  category={{ color: 'blue', name: 'Accommodation' }} poiDataList={props.poiDataList} switchView={props.switchView} toggleDrawer={props.toggleDrawer} />
        </ChakraProvider>
    );
}

export default View3RatingsAccomodation;
