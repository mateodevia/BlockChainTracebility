import React from 'react';
import { useState } from 'react';
import './Cartoflex.css';
import CrearTransaccion from '../CrearTransaccion/CrearTransaccion';

import CrearTransformacion from '../CrearTransformacion/CrearTransformacion';
function Cartoflex() {
    let [opcion, setOpcion] = useState('');
    let irAViz = () => {
        window.location = '/visualization';
    };
    return (
        <div className='contenedorPropilco'>
            <h1>Registro de Transformación Cartoflex</h1>
            <button
                className='botonGris'
                onClick={() => setOpcion('transformacion')}
            >
                Crear Transformación
            </button>
            <button
                className='botonGris'
                onClick={() => setOpcion('transaccion')}
            >
                Crear Transacción
            </button>
            <button className='botonGris' onClick={irAViz}>
                Visualizar Cadena
            </button>
            {opcion === 'transformacion' && <CrearTransformacion />}
            {opcion === 'transaccion' && <CrearTransaccion />}
        </div>
    );
}

export default Cartoflex;
