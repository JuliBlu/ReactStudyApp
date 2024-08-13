import React from 'react';
import {
    ChakraProvider,
} from '@chakra-ui/react';
import POIRatingComponent from './POIRatingComponent';

function View11RatingsShopping(props) {
    
    return (
        <ChakraProvider>
           <POIRatingComponent category={{ color: 'teal', name: 'Commercial and Shopping' }} poiDataList={props.poiDataList} switchView={props.switchView} toggleDrawer={props.toggleDrawer}/>
        </ChakraProvider>
    );
}

export default View11RatingsShopping;
