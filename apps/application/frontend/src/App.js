import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Instrucciones from './components/Instrucciones/Instrucciones';
import Consulta from './components/Consulta/Consulta';

function App() {
    let [buscado, setBuscado] = useState(undefined);
    let [consulta, setConsulta] = useState('');
    return (
        <React.Fragment>
            <Header setBuscado={setBuscado} setConsulta={setConsulta} />
            <div className='contenedor'>
                <div id='contenedorViz' className='contenedorViz'>
                    <div className='subContenedorViz'>
                        {buscado && (
                            <Consulta buscado={buscado} consulta={consulta} />
                        )}
                        {!buscado && <Instrucciones />}
                    </div>
                </div>
                <div className='contenedorMenu'></div>
            </div>
        </React.Fragment>
    );
}

export default App;
