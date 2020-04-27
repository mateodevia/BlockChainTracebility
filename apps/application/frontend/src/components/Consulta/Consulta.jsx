import React, { useState, useEffect } from 'react';
import './Consulta.css';
import GraphViz from '../GraphViz/GraphViz';
import OriginGraphViz from '../OriginGraphViz/OriginGraphViz';

function Consulta(props) {
    return (
        <React.Fragment>
            {props.consulta === 'destino' && (
                <GraphViz buscado={props.buscado} />
            )}
            {props.consulta === 'origen' && (
                <OriginGraphViz buscado={props.buscado} />
            )}
        </React.Fragment>
    );
}

export default Consulta;
