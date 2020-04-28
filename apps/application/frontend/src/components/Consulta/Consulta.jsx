import React, { useState, useEffect } from 'react';
import './Consulta.css';
import GraphViz from '../GraphViz/GraphViz';
import OriginGraphViz from '../OriginGraphViz/OriginGraphViz';

function Consulta(props) {
    return (
        <React.Fragment>
            {props.consulta === 'destino' && (
                <GraphViz
                    buscado={props.buscado}
                    selectTru={props.selectTru}
                    selectActividad={props.selectActividad}
                    selectTransaccion={props.selectTransaccion}
                />
            )}
            {props.consulta === 'origen' && (
                <OriginGraphViz
                    buscado={props.buscado}
                    selectTru={props.selectTru}
                    selectActividad={props.selectActividad}
                    selectTransaccion={props.selectTransaccion}
                />
            )}
        </React.Fragment>
    );
}

export default Consulta;
