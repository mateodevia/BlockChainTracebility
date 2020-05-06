import React from 'react';
import { useState } from 'react';
import './Cartoflex.css';
import CrearTransaccion from '../CrearTransaccion/CrearTransaccion';

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
                Crear Transaformación
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
            {opcion === 'transformacion' && <div>Transformacion</div>}
            {opcion === 'transaccion' && <CrearTransaccion />}
        </div>
    );
}

export default Cartoflex;
