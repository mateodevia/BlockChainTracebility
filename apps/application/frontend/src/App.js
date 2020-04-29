import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Instrucciones from './components/Instrucciones/Instrucciones';
import Consulta from './components/Consulta/Consulta';
import Detalle from './components/Detalle/Detalle';
import Convenciones from './components/Convenciones/Convensiones';

function App() {
    let [buscado, setBuscado] = useState(undefined);
    let [consulta, setConsulta] = useState('');
    let [tru, setTru] = useState(undefined);
    let [actividad, setActividad] = useState(undefined);
    let [transaccion, setTransaccion] = useState(undefined);

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
    return (
        <React.Fragment>
            <Header setBuscado={setBuscado} setConsulta={setConsulta} />
            <div className='contenedor'>
                <div id='contenedorViz' className='contenedorViz'>
                    <div className='subContenedorViz'>
                        {buscado && (
                            <React.Fragment>
                                <Convenciones />
                                <Consulta
                                    buscado={buscado}
                                    consulta={consulta}
                                    selectTru={selectTru}
                                    selectActividad={selectActividad}
                                    selectTransaccion={selectTransaccion}
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
                    />
                </div>
            </div>
        </React.Fragment>
    );
}

export default App;
