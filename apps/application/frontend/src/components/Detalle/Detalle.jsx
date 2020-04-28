import React from 'react';
import './Detalle.css';
import DetalleTru from '../DetalleTru/DetalleTru';
import DetalleActividad from '../DetalleActividad/DetalleActividad';
import DetalleTransaccion from '../DetalleTransaccion/DetalleTransaccion';

function Detalle(props) {
    return (
        <div>
            {!props.tru && !props.actividad && !props.transaccion && (
                <div className='detalleNada'>
                    Seleccione un nodo para ver más información
                </div>
            )}
            {props.tru && <DetalleTru tru={props.tru} />}
            {props.actividad && (
                <DetalleActividad actividad={props.actividad} />
            )}
            {props.transaccion && (
                <DetalleTransaccion transaccion={props.transaccion} />
            )}
        </div>
    );
}

export default Detalle;
