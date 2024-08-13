import React from 'react';
import {
    ChakraProvider,
} from '@chakra-ui/react';
import POIRatingComponent from './POIRatingComponent';

function View7RatingsEntertainment(props) {
    
    return (
        <ChakraProvider>
           <POIRatingComponent category={{ color: 'red', name: 'Entertainment' }} poiDataList={props.poiDataList} switchView={props.switchView} toggleDrawer={props.toggleDrawer}/>
        </ChakraProvider>
    );
}

export default View7RatingsEntertainment;
