import React from 'react';
import {
    ChakraProvider,
} from '@chakra-ui/react';
import POIRatingComponent from './POIRatingComponent';

function View9RatingsCulturalSites(props) {
    
    return (
        <ChakraProvider>
           <POIRatingComponent category={{ color: 'orange', name: 'Cultural and Historical Sites' }} poiDataList={props.poiDataList} switchView={props.switchView} toggleDrawer={props.toggleDrawer}/>
        </ChakraProvider>
    );
}

export default View9RatingsCulturalSites;
