import React, { useState, useEffect } from 'react';
import POICategoryComponent from './POICategoryComponent';

function View8TaskCulturalSites(props) {
    
    return (
        <POICategoryComponent category={{ color: 'orange', name: 'Cultural and Historical Sites' }} savePOIData={props.savePOIData} switchView={props.switchView} toggleDrawer={props.toggleDrawer} nextView={"view9"}/>
    );
}

export default View8TaskCulturalSites;
