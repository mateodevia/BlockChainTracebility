import React from 'react';
import GoogleMap from '../GoogleMap/GoogleMap';

function DetalleTru(props) {
    let handleProcedencia = () => {
        props.setBuscado(props.tru.id);
        props.setConsulta('origen');
        props.updateInput(props.tru.id);
        props.setMachete(!props.machete);
    };

    let handleRastrear = () => {
        props.setBuscado(props.tru.id);
        props.setConsulta('destino');
        props.updateInput(props.tru.id);
        props.setMachete(!props.machete);
    };
    return (
        <div className='contenedorDetalle'>
            <h3 className='tituloDetalle'>Activo:</h3>
            <h4 className='idDetalleTru'>{props.tru.id}</h4>
            <button className='boton' onClick={handleProcedencia}>
                Consultar Procedencia
            </button>
            <button className='boton' onClick={handleRastrear}>
                Rastrear Activo
            </button>
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
                    <h5 className='atributoDetalle'>último dueño:</h5>
                    <p className='valorDetalle'>{props.tru.dueñoActual}</p>
                </React.Fragment>
            )}
            {!props.tru.consumido && (
                <React.Fragment>
                    <h5 className='atributoDetalle'>dueño Actual:</h5>
                    <p className='valorDetalle'>{props.tru?.dueñoActual}</p>
                </React.Fragment>
            )}
            {Object.keys(props.tru.caracteristicas)
                .filter(
                    (caracteristica) =>
                        caracteristica !== 'imagenes' &&
                        caracteristica !== 'videos'
                )
                .map((caracteristica) => (
                    <React.Fragment>
                        <h5 className='atributoDetalle'>{caracteristica}:</h5>
                        <p className='valorDetalle'>
                            {props.tru.caracteristicas[caracteristica]}
                        </p>
                    </React.Fragment>
                ))}
            {props.tru.caracteristicas.imagenes?.map((imagen) => (
                <React.Fragment>
                    <h5 className='atributoDetalle'>{imagen[0]}:</h5>
                    <img className='imagenDetalle' src={imagen[1]} />
                </React.Fragment>
            ))}
            {props.tru.caracteristicas.videos?.map((video) => (
                <React.Fragment>
                    <h5 className='atributoDetalle'>{video[0]}:</h5>
                    <iframe className='videoDetalle' src={video[1]} />
                </React.Fragment>
            ))}
            <div className='mapDetalle'>
                <h5 className='atributoDetalle'>Ubicación:</h5>
                <GoogleMap ubicacion={props.tru.ubicacion} />
            </div>
        </div>
    );
}

export default DetalleTru;
