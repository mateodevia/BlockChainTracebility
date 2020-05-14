import React from 'react';
import './Flecha.css';

function Flecha() {
    return (
        <div className='contenedorFlecha'>
            <div className='textoEje'>Antiguo</div>
            <div className='tiempo'>Tiempo</div>
            <div className='lineaFlecha'></div>
            <div className='flecha'></div>
            <div className='textoEje'>Reciente</div>
        </div>
    );
}

export default Flecha;
