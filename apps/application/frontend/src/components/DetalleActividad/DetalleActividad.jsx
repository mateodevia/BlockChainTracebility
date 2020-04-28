import React from 'react';
import GoogleMap from '../GoogleMapMarkers/GoogleMapMarkers';

function DetalleActividad(props) {
    return (
        <div className='contenedorDetalle'>
            <h3 className='tituloDetalle'>Actividad:</h3>
            <h4 className='idDetalle'>{props.actividad.id}</h4>
            <h5 className='atributoDetalle'>Tipo:</h5>
            <p className='valorDetalle'>{props.actividad.tipo}</p>
            <h5 className='atributoDetalle'>Realizada por:</h5>
            <p className='valorDetalle'>{props.actividad.actor}</p>
            <h5 className='atributoDetalle'>Fecha:</h5>
            <p className='valorDetalle'>{props.actividad.fecha}</p>
            {props.actividad.consume.length > 0 && (
                <React.Fragment>
                    <h5 className='atributoDetalle'>Consumió los activos:</h5>
                    {props.actividad.consume.map((tru) => (
                        <p className='idTrus'>- {tru.id}</p>
                    ))}
                </React.Fragment>
            )}
            {props.actividad.produce.length > 0 && (
                <React.Fragment>
                    <h5 className='atributoDetalle'>Produjo los activos:</h5>
                    {props.actividad.produce.map((tru) => (
                        <p className='idTrus'>- {tru.id}</p>
                    ))}
                </React.Fragment>
            )}
            {props.actividad.tipo === 'TRANSPORTAR' && (
                <div className='mapDetalle'>
                    <h5 className='atributoDetalle'>Ubicaciones:</h5>
                    <GoogleMap
                        destino={props.actividad.destino}
                        origen={props.actividad.consume[0].ubicacion}
                    />
                </div>
            )}
        </div>
    );
}

export default DetalleActividad;
