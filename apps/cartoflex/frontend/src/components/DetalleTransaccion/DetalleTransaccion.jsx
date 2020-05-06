import React from 'react';

function DetalleTransaccion(props) {
    return (
        <div className='contenedorDetalle'>
            <h3 className='tituloDetalle'>Transacción:</h3>
            <h4 className='idDetalle'>{props.transaccion.id}</h4>
            <h5 className='atributoDetalle'>Fuente:</h5>
            <p className='valorDetalle'>{props.transaccion.fuente}</p>
            <h5 className='atributoDetalle'>Destino:</h5>
            <p className='valorDetalle'>{props.transaccion.destino}</p>
            <h5 className='atributoDetalle'>Se transfirieron los activos:</h5>
            {props.transaccion.trus.map((tru) => (
                <p className='idTrus'>- {tru}</p>
            ))}
        </div>
    );
}

export default DetalleTransaccion;
