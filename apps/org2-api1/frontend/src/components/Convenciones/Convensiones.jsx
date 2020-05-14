import React, { useState } from 'react';
import './Convensiones.css';

function Convensiones() {
    return (
        <div className='contenedorConvensiones'>
            <div className='convencion'>
                <div className='contenedorFigura'>
                    <div className='circulo'></div>
                </div>
                <div className='tituloConvension'>Activos</div>
            </div>
            <div className='convencion'>
                <div className='contenedorFigura'>
                    <div className='rectangulo'></div>
                </div>
                <div className='tituloConvension'>Actividades</div>
            </div>
            <div className='convencion'>
                <div className='contenedorFigura'>
                    <div className='rombo'></div>
                </div>
                <div className='tituloConvension'>Transacciones</div>
            </div>
            <div className='convencion'>
                <div className='contenedorFigura'>
                    <div className='propilco'></div>
                </div>
                <div className='tituloConvension'>Propilco</div>
            </div>
            <div className='convencion'>
                <div className='contenedorFigura'>
                    <div className='cartoflex'></div>
                </div>
                <div className='tituloConvension'>Cartoflex</div>
            </div>
            <div className='convencion'>
                <div className='contenedorFigura'>
                    <div className='transportador'></div>
                </div>
                <div className='tituloConvension'>Transaportador</div>
            </div>
        </div>
    );
}

export default Convensiones;
