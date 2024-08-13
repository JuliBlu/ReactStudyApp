import React from 'react';
import {
    ChakraProvider,
} from '@chakra-ui/react';
import POIRatingComponent from './POIRatingComponent';

function View5RatingsNaturalAttractions(props) {
    
    return (
        <ChakraProvider>
           <POIRatingComponent category={{ color: 'green', name: 'Natural Attractions' }} poiDataList={props.poiDataList} switchView={props.switchView} toggleDrawer={props.toggleDrawer}/>
        </ChakraProvider>
    );
}

export default View5RatingsNaturalAttractions;
