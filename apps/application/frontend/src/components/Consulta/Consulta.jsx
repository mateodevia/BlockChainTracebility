import React, { useState, useEffect } from 'react';
import './Consulta.css';
import GraphViz from '../GraphViz/GraphViz';
import OriginGraphViz from '../OriginGraphViz/OriginGraphViz';

function Consulta(props) {
    return (
        <React.Fragment>
            {props.consulta === 'destino' && (
                <React.Fragment>
                    <h1 className='tituloViz'>
                        Rastreo del activo: <br /> {props.buscado}
                    </h1>
                    <br />
                    <br />
                    <br />
                    <br />
                    <GraphViz
                        buscado={props.buscado}
                        selectTru={props.selectTru}
                        selectActividad={props.selectActividad}
                        selectTransaccion={props.selectTransaccion}
                    />
                </React.Fragment>
            )}
            {props.consulta === 'origen' && (
                <React.Fragment>
                    <h1 className='tituloViz'>
                        Procedencia del activo: <br /> {props.buscado}
                    </h1>
                    <br />
                    <br />
                    <br />
                    <br />
                    <OriginGraphViz
                        buscado={props.buscado}
                        selectTru={props.selectTru}
                        selectActividad={props.selectActividad}
                        selectTransaccion={props.selectTransaccion}
                    />
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default Consulta;
