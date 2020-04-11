import React from "react";
import "./Grupo.css";
import { useState } from "react";
import { useEffect } from "react";

function Grupo(props) {
  let [actividad, setActividad] = useState(undefined);
  let [grupos, setGrupos] = useState([]);
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
        <div
          className="actividad"
          style={{
            backgroundColor: props.coloresClaros[actividad?.actor],
            borderColor: props.colores[actividad?.actor],
          }}
        >
          {actividad.tipo}
        </div>
      )}
      <div className="contenedorGrupos">
        {grupos.map((grupo) => (
          <Grupo
            grupo={grupo}
            handleactualizar={props.handleactualizar}
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
