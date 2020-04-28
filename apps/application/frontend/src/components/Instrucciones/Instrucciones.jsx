import React from 'react';
import './Instrucciones.css';

function Instrucciones() {
    return (
        <div className='contenedorInstrucciones'>
            <h1>Bienvenido al Sistema de Seguimiento Blockchain</h1>
            <br />
            <div className='contenedorPasos'>
                <h3>
                    Para consultar un activo en de la cadena de suministro siga
                    los siguientes pasos:
                </h3>
                <ul>
                    <li>
                        Escoga el metodo de busqueda del activo (ID, SKU, o UPC)
                    </li>
                    <li>Si escogio SKU, escoja el actor que expidió el SKU</li>
                    <li>
                        Ingrese el identificador único del activo que desea
                        consultar
                    </li>
                    <li>
                        Oprima el boton correspondiente a la consulta que desea
                        realizar
                    </li>
                    <br />
                    <ul>
                        <li>
                            <b>Consultar Procedencia:</b> Esta consulta muestra
                            el historial de todo lo que pasó en la cadena de
                            suministro para lograr producir el activo que
                            consultó
                        </li>
                        <li>
                            <b>Rastrear activo:</b> Esta consulta muestra todo
                            lo que paso con un activo desde que fue registrado
                            con el identificador unico
                        </li>
                    </ul>
                </ul>
            </div>
        </div>
    );
}

export default Instrucciones;
