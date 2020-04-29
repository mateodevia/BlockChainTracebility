import React, { useState, useRef } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Instrucciones from './components/Instrucciones/Instrucciones';
import Consulta from './components/Consulta/Consulta';
import Detalle from './components/Detalle/Detalle';
import Convenciones from './components/Convenciones/Convensiones';
import Flecha from './components/Flecha/Flecha';

function App() {
    let [buscado, setBuscado] = useState(undefined);
    let [consulta, setConsulta] = useState('');
    let [tru, setTru] = useState(undefined);
    let [actividad, setActividad] = useState(undefined);
    let [transaccion, setTransaccion] = useState(undefined);
    let [machete, setMachete] = useState(false);
    let inputRef = useRef();

    let selectTru = (tru) => {
        setTru(tru);
        setActividad(undefined);
        setTransaccion(undefined);
    };

    let selectActividad = (actividad) => {
        setTru(undefined);
        setActividad(actividad);
        setTransaccion(undefined);
    };

    let selectTransaccion = (transaccion) => {
        setTru(undefined);
        setActividad(undefined);
        setTransaccion(transaccion);
    };

    let updateInput = (text) => {
        inputRef.current.value = text;
    };
    return (
        <React.Fragment>
            <Header
                setBuscado={setBuscado}
                setConsulta={setConsulta}
                inputRef={inputRef}
                machete={machete}
                setMachete={setMachete}
            />
            <div className='contenedor'>
                <div id='contenedorViz' className='contenedorViz'>
                    <div className='subContenedorViz'>
                        {buscado && (
                            <React.Fragment>
                                <Flecha />
                                <Convenciones />
                                <Consulta
                                    buscado={buscado}
                                    consulta={consulta}
                                    selectTru={selectTru}
                                    selectActividad={selectActividad}
                                    selectTransaccion={selectTransaccion}
                                    machete={machete}
                                />
                            </React.Fragment>
                        )}
                        {!buscado && <Instrucciones />}
                    </div>
                </div>
                <div className='contenedorMenu'>
                    <Detalle
                        tru={tru}
                        actividad={actividad}
                        transaccion={transaccion}
                        setBuscado={setBuscado}
                        setConsulta={setConsulta}
                        updateInput={updateInput}
                        machete={machete}
                        setMachete={setMachete}
                    />
                </div>
            </div>
        </React.Fragment>
    );
}

export default App;
