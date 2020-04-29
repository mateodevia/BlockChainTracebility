import React from 'react';
import './Header.css';
import { useRef } from 'react';
import { useState } from 'react';

function Header(props) {
    let [actorActivo, setActorActivo] = useState(true);
    let idRef = useRef();
    let actorRef = useRef();

    let handleChange = () => {
        if (idRef.current.value === 'SKU') {
            setActorActivo(false);
        } else {
            setActorActivo(true);
        }
    };

    let handleRastrear = () => {
        if (props.inputRef.current.value !== '') {
            props.setBuscado(props.inputRef.current.value);
            props.setConsulta('destino');
            props.setMachete(!props.machete);
        } else {
            props.setBuscado(undefined);
            props.setConsulta('');
        }
    };

    let handleProcedencia = () => {
        if (props.inputRef.current.value !== '') {
            props.setBuscado(props.inputRef.current.value);
            props.setConsulta('origen');
            props.setMachete(!props.machete);
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
                placeholder='Identificador del activo'
                className='inputBuscar'
                ref={props.inputRef}
            />
            <div className='contenedorBotones'>
                <button className='boton' onClick={handleProcedencia}>
                    Consultar Procedencia
                </button>
                <button className='boton' onClick={handleRastrear}>
                    Rastrear Activo
                </button>
            </div>
        </div>
    );
}

export default Header;
