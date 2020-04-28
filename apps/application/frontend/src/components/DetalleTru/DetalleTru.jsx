import React from 'react';
import './DetalleTru.css';

function DetalleTru(props) {
    return (
        <div className='contenedorDetalle'>
            <h3 className='tituloDetalle'>Activo:</h3>
            <h4 className='idDetalle'>{props.tru.id}</h4>
            {props.tru.SKU && (
                <React.Fragment>
                    <h5 className='atributoDetalle'>SKU:</h5>
                    <p className='valorDetalle'>{props.tru.SKU}</p>
                </React.Fragment>
            )}
            {props.tru.UPC && (
                <React.Fragment>
                    <h5 className='atributoDetalle'>UPC:</h5>
                    <p className='valorDetalle'>{props.tru.UPC}</p>
                </React.Fragment>
            )}
            <h5 className='atributoDetalle'>Consumido:</h5>
            <p className='valorDetalle'>{props.tru.consumido ? 'Sí' : 'No'}</p>
            {props.tru.consumido && (
                <React.Fragment>
                    <h5 className='atributoDetalle'>Ultimo dueño:</h5>
                    <p className='valorDetalle'>{props.tru.dueñoActual}</p>
                </React.Fragment>
            )}
            {!props.tru.consumido && (
                <React.Fragment>
                    <h5 className='atributoDetalle'>Dueño Actual:</h5>
                    <p className='valorDetalle'>{props.tru.dueñoActual}</p>
                </React.Fragment>
            )}
        </div>
    );
}

export default DetalleTru;
