import React from 'react';
import './App.css';
import GraphViz from './components/GraphViz/GraphViz';
import OriginGraphViz from './components/OriginGraphViz/OriginGraphViz';
import Header from './components/Header/Header';

function App() {
    return (
        <React.Fragment>
            <Header />
            <div className='contenedor'>
                <div id='contenedorViz' className='contenedorViz'>
                    <div className='subContenedorViz'>
                        <GraphViz />
                    </div>
                </div>
                <div className='contenedorMenu'></div>
            </div>
        </React.Fragment>
    );
}

export default App;
