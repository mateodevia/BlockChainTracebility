import React from 'react';
import './Grupo.css';
import './Trus.css';
import './Actividades.css';
import './Lineas.css';
import './Transacciones.css';
import { useState } from 'react';
import { useEffect } from 'react';

function Grupo(props) {
    let [actividad, setActividad] = useState(undefined);
    let [grupos, setGrupos] = useState([]);
    let [lines, setLines] = useState(<div></div>);
    let [lines2, setLines2] = useState(<div></div>);

    let calculateXCoordinate = (tru) => {
        let element = document.getElementById(tru.id);
        let parent = element?.parentElement.parentElement.parentElement;
        let parentOffset = parent?.getBoundingClientRect().left;
        let x = element?.getBoundingClientRect().left + 12 - parentOffset;
        return x;
    };

    let renderLines = () => {
        let newLines = actividad?.produce.map((tru, i) => {
            return (
                <line
                    key={i}
                    className='linea'
                    x1='50%'
                    y1='0'
                    x2={calculateXCoordinate(tru)}
                    y2='50'
                    style={{
                        stroke: props.colores[tru?.dueñoActual],
                    }}
                />
            );
        });
        setLines(newLines);
    };
    let renderLines2 = () => {
        let newLines = props.grupo.map((tru, i) => {
            return (
                <line
                    key={i}
                    className='linea'
                    x1={calculateXCoordinate(tru)}
                    y1='0'
                    x2='50%'
                    y2='50'
                    style={{
                        stroke: props.colores[actividad?.actor],
                    }}
                />
            );
        });
        setLines2(newLines);
    };

    let handleActualizar = () => {
        props.handleactualizar({});
        renderLines();
        renderLines2();
    };

    useEffect(() => {
        let newActividad = props.actividades.find(
            (act) => act.id === props.grupo[0].consumidoPor
        );

        let newGrupos = {};
        for (let i in newActividad?.produce) {
            let truAct = newActividad?.produce[i];
            let siguiente = truAct.consumidoPor || truAct.id;
            if (newGrupos[siguiente]) {
                newGrupos[siguiente].push(truAct);
            } else {
                newGrupos[siguiente] = [truAct];
            }
        }
        setGrupos(Object.values(newGrupos));
        setActividad(newActividad);
        /**
    let newGrupo = [...props.grupo];
    for (let i in newGrupo) {
      newGrupo[i].x =
        document.getElementById(newGrupo[i].id).getBoundingClientRect().left +
        12;
    }*/
    }, []);

    useEffect(() => {
        props.handleactualizar({});
        renderLines();
        renderLines2();
    }, [grupos]);

    return (
        <div className='contenedorGrupo'>
            {props.grupo.map((tru) => {
                return (
                    <div className='contenedorTru'>
                        <div
                            className='tru'
                            id={tru.id}
                            style={{
                                backgroundColor:
                                    props.coloresClaros[
                                        tru?.transacciones[0]?.fuente ||
                                            tru?.dueñoActual
                                    ],
                                borderColor:
                                    props.colores[
                                        tru?.transacciones[0]?.fuente ||
                                            tru?.dueñoActual
                                    ],
                            }}
                            onClick={() => props.selectTru(tru)}
                        ></div>
                        {tru?.transacciones.map((trans, i) => (
                            <React.Fragment>
                                <svg className='lineasCortas'>
                                    <line
                                        key={i}
                                        className='linea'
                                        x1='50%'
                                        y1='0'
                                        x2='50%'
                                        y2='50'
                                        style={{
                                            stroke: props.colores[trans.fuente],
                                        }}
                                    />
                                </svg>
                                <div
                                    className='transaccion'
                                    onClick={() =>
                                        props.selectTransaccion(trans)
                                    }
                                ></div>
                            </React.Fragment>
                        ))}
                    </div>
                );
            })}
            {actividad && (
                <React.Fragment>
                    <svg className='lineas'>{lines2}</svg>
                    <div
                        id={actividad.id}
                        className='actividad'
                        style={{
                            backgroundColor:
                                props.coloresClaros[actividad?.actor],
                            borderColor: props.colores[actividad?.actor],
                        }}
                        onClick={() => props.selectActividad(actividad)}
                    >
                        {actividad.tipo}
                    </div>
                    <svg className='lineas'>{lines}</svg>
                </React.Fragment>
            )}
            <div className='contenedorGrupos'>
                {grupos.map((grupo) => (
                    <Grupo
                        grupo={grupo}
                        handleactualizar={handleActualizar}
                        actividades={props.actividades}
                        colores={props.colores}
                        coloresClaros={props.coloresClaros}
                        selectTru={props.selectTru}
                        selectActividad={props.selectActividad}
                        selectTransaccion={props.selectTransaccion}
                    />
                ))}
            </div>
        </div>
    );
}

export default Grupo;
