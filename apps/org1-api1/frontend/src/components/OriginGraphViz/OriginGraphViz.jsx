import React, { useState, useEffect } from 'react';
import OriginGrupo from '../OriginGrupo/OriginGrupo';
import '../OriginGraphViz/OriginGraphViz.css';

function OrginGraphViz(props) {
    let [existe, setExiste] = useState(true);
    let [buscado, setBuscado] = useState(undefined);
    let [actividades, setActividades] = useState([]);
    let [grupos, setGrupos] = useState([]);
    let [lines, setLines] = useState(<div></div>);
    let [actualizar, setActualizar] = useState(false);

    let colores = {
        Propilco: 'rgb(255, 136, 1)',
        Cartoflex: 'rgb(122, 182, 72)',
        Transportador: 'rgb(128, 0, 255)',
        Canvan: 'rgb(255, 128, 0)',
    };

    let coloresClaros = {
        Propilco: 'rgb(255, 136, 1, 0.2)',
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
        let newLines = actividades[1]?.consume.map((tru, i) => {
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
        fetch(props.consulta).then((response) => {
            response.json().then((data) => {
                if (!data.error) {
                    setExiste(true);
                    let newGrupos = {};
                    for (let i in data.actividades[1]?.consume) {
                        let truAct = data.actividades[1]?.consume[i];
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

    useEffect(() => {
        window.addEventListener('resize', handleResize);
    });

    useEffect(() => {
        let contenedor = document.getElementById('contenedorViz');
        contenedor.scrollTo({
            top: document.body.scrollHeight,
            left: 0,
            behavior: 'smooth',
        });
    }, [lines]);

    return (
        <React.Fragment>
            {existe && (
                <div className='contenedorMaximoViz'>
                    <div
                        className='firstActivity'
                        id={actividades[0]?.id}
                        style={{
                            backgroundColor:
                                coloresClaros[actividades[0]?.actor],
                            borderColor: colores[actividades[0]?.actor],
                        }}
                        onClick={() => props.selectActividad(actividades[0])}
                    >
                        {actividades[0]?.tipo}
                    </div>
                    {actividades.length > 1 && (
                        <svg className='lineas'>{lines}</svg>
                    )}
                    <div className='contenedorGrupos'>
                        <div className='contenedorPrimerGrupo'>
                            {grupos.map((grupo) => (
                                <OriginGrupo
                                    buscado={buscado}
                                    grupo={grupo}
                                    actualizar={actualizar}
                                    handleactualizar={handleactualizar}
                                    actividades={actividades}
                                    colores={colores}
                                    coloresClaros={coloresClaros}
                                    selectTru={props.selectTru}
                                    selectActividad={props.selectActividad}
                                    selectTransaccion={props.selectTransaccion}
                                />
                            ))}
                        </div>
                    </div>
                    <svg className='lineas lineaFinal'>
                        <line
                            className='linea'
                            x1='50%'
                            y1='0'
                            x2='50%'
                            y2='50'
                            style={{
                                stroke:
                                    colores[
                                        buscado?.transacciones[0]?.fuente ||
                                            buscado?.dueñoActual
                                    ],
                            }}
                        />
                    </svg>
                    <div
                        className='buscado'
                        id={buscado?.id}
                        style={{
                            backgroundColor:
                                coloresClaros[
                                    buscado?.transacciones[0]?.fuente ||
                                        buscado?.dueñoActual
                                ],
                            borderColor:
                                colores[
                                    buscado?.transacciones[0]?.fuente ||
                                        buscado?.dueñoActual
                                ],
                        }}
                        onClick={() => props.selectTru(buscado)}
                    ></div>
                    {buscado?.transacciones.length > 0 && (
                        <React.Fragment>
                            <svg className='lineasCortas'>
                                <line
                                    className='linea'
                                    x1='50%'
                                    y1='0'
                                    x2='50%'
                                    y2='50'
                                    style={{
                                        stroke:
                                            colores[
                                                buscado?.transacciones[0]
                                                    ?.fuente
                                            ],
                                    }}
                                />
                            </svg>
                            <div
                                className='transaccion'
                                onClick={() =>
                                    props.selectTransaccion(
                                        buscado?.transacciones[0]
                                    )
                                }
                            ></div>
                        </React.Fragment>
                    )}
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

export default OrginGraphViz;
