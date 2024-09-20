import React, { useState, useEffect } from 'react';
import POICategoryComponent from './POICategoryComponent';

function View10TaskShopping(props) {
    
    return (
        <POICategoryComponent category={{ color: 'teal', name: 'Commercial and Shopping' }} savePOIData={props.savePOIData} switchView={props.switchView} toggleDrawer={props.toggleDrawer} nextView={"view11"} />
    );
}

export default View10TaskShopping;
