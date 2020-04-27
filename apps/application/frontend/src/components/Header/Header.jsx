import React from 'react';
import './Header.css';
import { useRef } from 'react';
import { useState } from 'react';

function Header() {
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
                placeholder='Identificador del activo'
                className='inputBuscar'
                ref={inputRef}
            />
            <div className='contenedorBotones'>
                <button className='botonHeader'>Consultar Procedencia</button>
                <button className='botonHeader'>Rastrear Activo</button>
            </div>
        </div>
    );
}

export default Header;
