import React, { useState, useEffect } from 'react';
import POICategoryComponent from './POICategoryComponent';

function View2TaskAccomodation(props) {
    
    return (
        <POICategoryComponent category={{ color: 'blue', name: 'Accommodation' }} savePOIData={props.savePOIData} switchView={props.switchView} toggleDrawer={props.toggleDrawer} nextView={"view3"} />
    );
}

export default View2TaskAccomodation;
