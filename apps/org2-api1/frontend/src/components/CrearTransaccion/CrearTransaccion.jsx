import React from 'react';
import './CrearTransaccion.css';
import { useState } from 'react';

function CrearTransaccion() {
    let [trus, setTrus] = useState([]);
    let [esperando, setEsperando] = useState(false);

    let crearTransaccion = () => {
        let request = {
            fuente: 'Propilco',
            destino: document.getElementById('inputActor').value,
            fecha: new Date().toISOString(),
            trus: [],
        };
        let completo = true;
        for (let i in trus) {
            let tru = document.getElementById('TRU-' + i).value;
            if (tru !== '') {
                request.trus.push(tru);
            } else {
                completo = false;
            }
        }
        if (completo) {
            setEsperando(true);
            fetch('/v1/api/transaccion', {
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((response) => {
                response.json().then((data) => {
                    if (data.error) {
                        alert(
                            data.error.replace(
                                'error in simulation: transaction returned with failure: ',
                                ''
                            )
                        );
                    } else {
                        console.log(data);
                        alert(data.msg);
                    }
                    setEsperando(false);
                    setTrus([]);
                });
            });
        }
    };

    return (
        <div>
            <h3>
                Agregue el nombre del actor con el cual va a registrar la
                transaccion y los TRUs involucrados en la transacción.
            </h3>
            <div className='izquierdaPropilco'>
                <label>Destinatario: </label>
                <select id='inputActor' name='Actor'>
                    <option value='Cartoflex'>Cartoflex</option>
                    <option value='Transportador'>Transportador</option>
                </select>
                <br />
                <br />
                <label>TRUs invlucrados:</label>
                <br />
                {trus.map((tru, i) => (
                    <input
                        id={'TRU-' + i}
                        type='text'
                        className='propilcoInput'
                    />
                ))}
                <button
                    className='agregarPropilco'
                    onClick={() => setTrus([...trus, {}])}
                    disabled={esperando}
                >
                    Agregar Tru
                </button>
                <br />
                <br />
                <button
                    className='crearActividad'
                    onClick={crearTransaccion}
                    disabled={esperando}
                >
                    Crear Transacción
                </button>
            </div>
        </div>
    );
}

export default CrearTransaccion;
