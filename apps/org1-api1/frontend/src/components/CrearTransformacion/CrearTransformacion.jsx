import React from 'react';
import { useState } from 'react';
import './CrearTransformacion.css';

function CrearTransformacion() {
    let [consumidos, setConsumidos] = useState([]);
    let [producidos, setProducidos] = useState([]);
    let [esperando, setEsperando] = useState(false);

    let crearTransformacion = () => {
        let trusConsumidos = [];
        let trusProducidos = [];
        let completo = true;
        for (let i in consumidos) {
            let tru = document.getElementById('TRU-CONSUMIDO-' + i).value;
            if (tru !== '') {
                trusConsumidos.push(tru);
            } else {
                completo = false;
            }
        }
        for (let i in producidos) {
            if (
                document.getElementById('sku-' + i).value !== '' &&
                document.getElementById('upc-' + i).value !== '' &&
                document.getElementById('referencia-' + i).value !== '' &&
                document.getElementById('cantidad-' + i).value !== '' &&
                document.getElementById('cliente-' + i).value !== '' &&
                document.getElementById('dimensiones-' + i).value !== '' &&
                document.getElementById('producto-' + i).value !== ''
            ) {
                let tru = { ...producidos[i] };
                tru.SKU = document.getElementById('sku-' + i).value;
                tru.UPC = document.getElementById('upc-' + i).value;
                let caracteristicas = {};
                caracteristicas.referencia = document.getElementById(
                    'referencia-' + i
                ).value;
                caracteristicas.cantidad =
                    document.getElementById('cantidad-' + i).value + 'kg';
                caracteristicas.cliente = document.getElementById(
                    'cliente-' + i
                ).value;
                caracteristicas.dimensiones = document.getElementById(
                    'dimensiones-' + i
                ).value;
                caracteristicas.producto = document.getElementById(
                    'producto-' + i
                ).value;
                tru.caracteristicas = caracteristicas;
                trusProducidos.push(tru);
            } else {
                completo = false;
            }
        }
        if (completo) {
            let request = {
                trus_consumidos: trusConsumidos,
                trus_producidos: trusProducidos,
                actor: 'Cartoflex',
            };
            setEsperando(true);
            fetch('v1/api/actividad/transformar', {
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
                        alert(data.msg);
                        setConsumidos([]);
                        setProducidos([]);
                    }
                    setEsperando(false);
                });
            });
        } else {
            alert(
                'La información no es suficiente para crear una transformación'
            );
        }
    };
    return (
        <div>
            <h3>
                Agregue los IDs de los TRUs que consumió en su transformación, y
                las caracteristicas de los TRUs producidos.
            </h3>
            <div className='izquierdaCartoflex'>
                <label>TRUs consumidos:</label>
                <br />
                {consumidos.map((tru, i) => (
                    <input
                        id={'TRU-CONSUMIDO-' + i}
                        type='text'
                        className='cartoflexInput'
                    />
                ))}
                <button
                    className='botonCartoflex'
                    onClick={() => setConsumidos([...consumidos, {}])}
                    disabled={esperando}
                >
                    Agregar TRU Consumido
                </button>
                <br />
                <br />
                <label>TRUs producidos:</label>
                <br />
                {producidos.map((tru, i) => (
                    <React.Fragment>
                        <br />
                        <div className='lineaCartoflex'></div>
                        <br />
                        <label>SKU: </label>
                        <input
                            id={'sku-' + i}
                            className='cartoflexInput'
                            type='text'
                        />
                        <label>UPC: </label>
                        <input
                            id={'upc-' + i}
                            className='cartoflexInput'
                            type='text'
                        />
                        <label>Referencia: </label>
                        <input
                            id={'referencia-' + i}
                            className='cartoflexInput'
                            type='number'
                        />
                        <label>Cantidad: </label>
                        <input
                            id={'cantidad-' + i}
                            className='cartoflexInput'
                            type='number'
                        />
                        <label>Cliente: </label>
                        <input
                            id={'cliente-' + i}
                            className='cartoflexInput'
                            type='number'
                        />
                        <label>Dimensiones: </label>
                        <input
                            id={'dimensiones-' + i}
                            className='cartoflexInput'
                            type='number'
                        />
                        <label>Producto: </label>
                        <input
                            id={'producto-' + i}
                            className='cartoflexInput'
                            type='number'
                        />
                        <br />
                    </React.Fragment>
                ))}
                <button
                    className='botonCartoflex'
                    onClick={() => setProducidos([...producidos, {}])}
                    disabled={esperando}
                >
                    Agregar TRU Producido
                </button>
                <br />
                <br />
                <button
                    className='botonCartoflexLargo'
                    onClick={crearTransformacion}
                    disabled={esperando}
                >
                    Agregar Transformación
                </button>
                <br />
                <br />
            </div>
        </div>
    );
}

export default CrearTransformacion;
