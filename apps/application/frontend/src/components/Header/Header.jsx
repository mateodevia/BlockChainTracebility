import React from 'react';
import './Header.css';
import { useRef } from 'react';
import { useState } from 'react';

function Header(props) {
    let [actorActivo, setActorActivo] = useState(true);
    let idRef = useRef();
    let actorRef = useRef();
    let inputRef = useRef();

    let handleChange = () => {
        if (idRef.current.value === 'SKU') {
            setActorActivo(false);
        } else {
            setActorActivo(true);
        }
    };

    let handleRastrear = () => {
        if (inputRef.current.value !== '') {
            props.setBuscado(inputRef.current.value);
            props.setConsulta('destino');
        } else {
            props.setBuscado(undefined);
            props.setConsulta('');
        }
    };

    let handleProcedencia = () => {
        if (inputRef.current.value !== '') {
            props.setBuscado(inputRef.current.value);
            props.setConsulta('origen');
        } else {
            props.setBuscado(undefined);
            props.setConsulta('');
        }
    };

    return (
        <div className='header'>
            <label className='labelHeader'>Buscar por:</label>
            <select
                className='selectIdentificador'
                ref={idRef}
                onChange={handleChange}
            >
                <option value='ID TRU'>ID TRU</option>
                <option value='SKU'>SKU</option>
                <option value='UPC'>UPC</option>
            </select>
            <select
                className='selectActor'
                ref={actorRef}
                disabled={actorActivo}
            >
                <option>Propilco</option>
                <option>Cartoflex</option>
                <option>Transportador</option>
                <option>Canvan</option>
            </select>
            <input
                type='text'
                value='efa91e20-7413-11ea-9fdf-2174e1b0eb66-0'
                placeholder='Identificador del activo'
                className='inputBuscar'
                ref={inputRef}
            />
            <div className='contenedorBotones'>
                <button className='botonHeader' onClick={handleProcedencia}>
                    Consultar Procedencia
                </button>
                <button className='botonHeader' onClick={handleRastrear}>
                    Rastrear Activo
                </button>
            </div>
        </div>
    );
}

export default Header;
