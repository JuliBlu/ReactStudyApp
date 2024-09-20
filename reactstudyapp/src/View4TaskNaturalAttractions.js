import React, { useState, useEffect } from 'react';
import POICategoryComponent from './POICategoryComponent';

function View4TaskNaturalAttractions(props) {
    
    return (
        <POICategoryComponent category={{ color: 'green', name: 'Natural Attractions' }} savePOIData={props.savePOIData} switchView={props.switchView} toggleDrawer={props.toggleDrawer} nextView={"view5"} />
    );
}

export default View4TaskNaturalAttractions;
