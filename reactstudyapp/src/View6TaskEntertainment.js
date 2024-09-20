import React, { useState, useEffect } from 'react';
import POICategoryComponent from './POICategoryComponent';

function View6TaskEntertainment(props) {
    
    return (
        <POICategoryComponent category={{ color: 'red', name: 'Entertainment' }} savePOIData={props.savePOIData} switchView={props.switchView} toggleDrawer={props.toggleDrawer} nextView={"view7"} />
    );
}

export default View6TaskEntertainment;
