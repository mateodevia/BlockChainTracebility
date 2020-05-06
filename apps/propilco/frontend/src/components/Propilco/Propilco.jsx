import React from 'react';
import './Propilco.css';
import { useState } from 'react';
import AgregarActividad from '../AgregarActividad/AgregarActividad';

function Propilco() {
    let [opcion, setOpcion] = useState('');
    let irAViz = () => {
        window.location = '/visualization';
    };
    return (
        <div className='contenedorPropilco'>
            <h1>Registro de Produccion Propilco</h1>
            <button
                className='botonGris'
                onClick={() => setOpcion('actividad')}
            >
                Crear Actividad
            </button>
            <button
                className='botonGris'
                onClick={() => setOpcion('transaccion')}
            >
                Crear Transaccion
            </button>
            <button className='botonGris' onClick={irAViz}>
                Visualizar Cadena
            </button>
            {opcion === 'actividad' && <AgregarActividad />}
            {opcion === 'transaccion' && <div>Transaccion</div>}
        </div>
    );
}

export default Propilco;
