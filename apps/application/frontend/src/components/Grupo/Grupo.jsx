import React from "react";
import "./Grupo.css";
import { useState } from "react";
import { useEffect } from "react";

function Grupo(props) {
  let [actividad, setActividad] = useState(undefined);
  let [grupos, setGrupos] = useState([]);
  let [lines, setLines] = useState(<div></div>);
  let [lines2, setLines2] = useState(<div></div>);

  let calculateXCoordinate = (tru) => {
    let element = document.getElementById(tru.id);
    let parent = element?.parentElement.parentElement;
    console.log(parent);
    let parentOffset = parent.getBoundingClientRect().left;
    let x = element?.getBoundingClientRect().left + 12 - parentOffset;
    return x;
  };

  let renderLines = () => {
    let newLines = actividad?.produce.map((tru, i) => {
      return (
        <line
          key={i}
          className="linea"
          x1="50%"
          y1="0"
          x2={calculateXCoordinate(tru)}
          y2="50"
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
          className="linea"
          x1={calculateXCoordinate(tru)}
          y1="0"
          x2="50%"
          y2="50"
          style={{
            stroke: props.colores[tru?.dueñoActual],
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
    <div className="contenedorGrupo">
      {props.grupo.map((tru) => {
        return (
          <div
            className="tru"
            id={tru.id}
            style={{
              backgroundColor: props.coloresClaros[tru?.dueñoActual],
              borderColor: props.colores[tru?.dueñoActual],
            }}
          ></div>
        );
      })}
      {actividad && (
        <React.Fragment>
          <svg className="lineas">{lines2}</svg>
          <div
            id={actividad.id}
            className="actividad"
            style={{
              backgroundColor: props.coloresClaros[actividad?.actor],
              borderColor: props.colores[actividad?.actor],
            }}
          >
            {actividad.tipo}
          </div>
          <svg className="lineas">{lines}</svg>
        </React.Fragment>
      )}
      <div className="contenedorGrupos">
        {grupos.map((grupo) => (
          <Grupo
            grupo={grupo}
            handleactualizar={handleActualizar}
            actividades={props.actividades}
            colores={props.colores}
            coloresClaros={props.coloresClaros}
          />
        ))}
      </div>
    </div>
  );
}

export default Grupo;
