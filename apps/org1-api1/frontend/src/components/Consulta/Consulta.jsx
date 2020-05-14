import React, { useState, useEffect } from 'react';
import './Consulta.css';
import GraphViz from '../GraphViz/GraphViz';
import OriginGraphViz from '../OriginGraphViz/OriginGraphViz';

function Consulta(props) {
    let consulta = '';
    if (props.tipo === 'id' && props.consulta === 'origen') {
        consulta = `/v1/api/trus/id/${props.buscado}/origen`;
    } else if (props.tipo === 'id' && props.consulta === 'destino') {
        consulta = `/v1/api/trus/id/${props.buscado}/destino`;
    } else if (props.tipo === 'sku' && props.consulta === 'origen') {
        consulta = `/v1/api/actores/${props.actor}/trus/${props.buscado}/origen`;
    } else if (props.tipo === 'sku' && props.consulta === 'destino') {
        consulta = `/v1/api/actores/${props.actor}/trus/${props.buscado}/destino`;
    } else if (props.tipo === 'upc' && props.consulta === 'origen') {
        consulta = `/v1/api/trus/upc/${props.buscado}/origen`;
    } else if (props.tipo === 'upc' && props.consulta === 'destino') {
        consulta = `/v1/api/trus/upc/${props.buscado}/destino`;
    }
    return (
        <React.Fragment>
            {props.machete && props.consulta === 'destino' && (
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
                        consulta={consulta}
                    />
                </React.Fragment>
            )}
            {!props.machete && props.consulta === 'destino' && (
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
                        consulta={consulta}
                    />
                </React.Fragment>
            )}
            {props.machete && props.consulta === 'origen' && (
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
                        consulta={consulta}
                    />
                </React.Fragment>
            )}
            {!props.machete && props.consulta === 'origen' && (
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
                        consulta={consulta}
                    />
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default Consulta;
