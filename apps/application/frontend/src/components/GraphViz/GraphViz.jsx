import React from 'react';
import './GraphViz.css';
import { useEffect } from 'react';
import { useState } from 'react';
import Grupo from '../Grupo/Grupo';

function GraphViz(props) {
    let [existe, setExiste] = useState(true);
    let [buscado, setBuscado] = useState(undefined);
    let [actividades, setActividades] = useState([]);
    let [grupos, setGrupos] = useState([]);
    let [lines, setLines] = useState(<div></div>);
    let [actualizar, setActualizar] = useState(false);
    let colores = {
        Propilco: 'rgb(12, 124, 186)',
        Cartoflex: 'rgb(122, 182, 72)',
        Transportador: 'rgb(128, 0, 255)',
        Canvan: 'rgb(255, 128, 0)',
    };

    let coloresClaros = {
        Propilco: 'rgb(12, 124, 186, 0.2)',
        Cartoflex: 'rgb(122, 182, 72, 0.2)',
        Transportador: 'rgb(128, 0, 255, 0.2)',
        Canvan: 'rgb(255, 128, 0, 0.2)',
    };

    let calculateXCoordinate = (tru) => {
        let x =
            document.getElementById(tru.id)?.getBoundingClientRect().left + 5;
        return x;
    };

    let renderLines = () => {
        let newLines = actividades[0]?.produce.map((tru, i) => {
            return (
                <line
                    key={i}
                    className='linea'
                    x1='50%'
                    y1='0'
                    x2={calculateXCoordinate(tru)}
                    y2='50'
                    style={{
                        stroke: colores[actividades[0]?.actor],
                    }}
                />
            );
        });
        setLines(newLines);
    };

    let handleResize = () => {
        //hacer algo para que se vuelva a renderizar el grafo
        renderLines();
    };

    let handleactualizar = () => {
        renderLines();
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
    });

    useEffect(() => {
        fetch(`/v1/api/trus/id/${props.buscado}/destino`).then((response) => {
            response.json().then((data) => {
                if (!data.error) {
                    setExiste(true);
                    data.actividades.reverse();
                    let newGrupos = {};
                    for (let i in data.actividades[0]?.produce) {
                        let truAct = data.actividades[0]?.produce[i];
                        let siguiente = truAct.consumidoPor || truAct.id;
                        if (newGrupos[siguiente]) {
                            newGrupos[siguiente].push(truAct);
                        } else {
                            newGrupos[siguiente] = [truAct];
                        }
                    }
                    setActividades(data.actividades);
                    setBuscado(data.tru);
                    setGrupos(Object.values(newGrupos));
                } else {
                    setExiste(false);
                }
            });
        });
    }, [props.buscado]);

    return (
        <React.Fragment>
            {existe && (
                <div>
                    <div className='contenedorBuscado'>
                        <div
                            className='buscado'
                            style={{
                                backgroundColor:
                                    coloresClaros[buscado?.dueñoActual],
                                borderColor: colores[buscado?.dueñoActual],
                            }}
                        ></div>
                    </div>
                    <svg className='lineas'>
                        <line
                            className='linea'
                            x1='50%'
                            y1='0'
                            x2='50%'
                            y2='50'
                            style={{
                                stroke: colores[buscado?.dueñoActual],
                            }}
                        />
                    </svg>
                    {buscado?.transacciones.map((trans, i) => (
                        <React.Fragment>
                            <div className='transaccionBase'></div>
                            <svg className='lineasCortas'>
                                <line
                                    key={i}
                                    className='linea'
                                    x1='50%'
                                    y1='0'
                                    x2='50%'
                                    y2='50'
                                    style={{
                                        stroke: colores[trans.destino],
                                    }}
                                />
                            </svg>
                        </React.Fragment>
                    ))}
                    <div
                        className='firstActivity'
                        id={actividades[0]?.id}
                        style={{
                            backgroundColor:
                                coloresClaros[actividades[0]?.actor],
                            borderColor: colores[actividades[0]?.actor],
                        }}
                    >
                        {actividades[0]?.tipo}
                    </div>
                    <svg className='lineas'>{lines}</svg>
                    <div className='contenedorGrupos'>
                        <div className='contenedorPrimerGrupo'>
                            {grupos.map((grupo) => (
                                <Grupo
                                    grupo={grupo}
                                    actualizar={actualizar}
                                    handleactualizar={handleactualizar}
                                    actividades={actividades}
                                    colores={colores}
                                    coloresClaros={coloresClaros}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {!existe && (
                <div className='contenedorInstrucciones'>
                    <h2>No se encontro el activo</h2>
                    <h3>
                        Porfavor revise el identificador y vuelva a intentar
                    </h3>
                </div>
            )}
        </React.Fragment>
    );
}

export default GraphViz;
