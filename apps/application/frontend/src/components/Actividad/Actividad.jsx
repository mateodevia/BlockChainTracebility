import React from "react";
import "./Actividad.css";

function Actividad(props) {
  return (
    <div>
      <div
        className="actividad"
        style={{
          backgroundColor: props.coloresClaros[props.actividad?.actor],
          borderColor: props.colores[props.actividad?.actor],
        }}
      >
        {props.actividad.tipo}
      </div>
      <svg height="50" width="100%">
        {props.actividad.produce.map((tru, i) => {
          return (
            <line
              key={i}
              className="linea"
              x1="50%"
              y1="0"
              x2="50%"
              y2="50"
              style={{
                stroke: props.colores[props.actividad?.actor],
              }}
            />
          );
        })}
      </svg>
      <div className="contenedorTrus">
        {props.actividad.produce.map((tru, i) => {
          return (
            <div
              key={i}
              className="tru"
              style={{
                backgroundColor: props.coloresClaros[tru?.dueñoActual],
                borderColor: props.colores[tru?.dueñoActual],
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default Actividad;
