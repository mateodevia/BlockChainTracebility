import React from 'react';
import { useState } from 'react';
import './AgregarActividad.css';

function AgregarActividad() {
    let [trus, setTrus] = useState([]);
    let [esperando, setEsperando] = useState(false);
    let agregar = () => {
        setTrus([...trus, {}]);
    };
    let crearActvidad = () => {
        let arreglo = [];
        let request = {};
        let completo = true;
        for (let i in trus) {
            if (
                document.getElementById('sku-' + i).value !== '' &&
                document.getElementById('nombre-' + i).value !== '' &&
                document.getElementById('cantidad-' + i).value !== '' &&
                document.getElementById('indice-' + i).value !== ''
            ) {
                let tru = { ...trus[i] };
                tru.SKU = document.getElementById('sku-' + i).value;
                let caracteristicas = {};
                caracteristicas.nombre = document.getElementById(
                    'nombre-' + i
                ).value;
                caracteristicas.cantidad = document.getElementById(
                    'cantidad-' + i
                ).value;
                caracteristicas.indice = document.getElementById(
                    'indice-' + i
                ).value;
                tru.caracteristicas = caracteristicas;
                console.log(tru);
                arreglo.push(tru);
            } else {
                completo = false;
            }
        }
        request.trus = arreglo;
        if (completo && trus.length > 0) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    request.ubicacion = {
                        lat: pos.coords.latitude,
                        lon: pos.coords.longitude,
                    };
                    request.actor = 'Propilco';
                    setEsperando(true);
                    fetch('v1/api/actividad/producir', {
                        method: 'POST',
                        body: JSON.stringify(request),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }).then((response) => {
                        response.json().then((data) => {
                            let mensaje = `Los IDs de los TRUs producidos son:
${data.trus_producidos.map((tru) => tru + '\n')}`;
                            console.log(mensaje);
                            alert(mensaje);
                            setTrus([]);
                            setEsperando(false);
                        });
                    });
                });
            } else {
                alert('Geolocation is not supported by this browser.');
                setTrus([]);
            }
        } else {
            alert('La información no es suficiente para crear una actividad');
        }
    };
    return (
        <React.Fragment>
            <h3>
                Agregue todos los TRUs que produjo durante la actividad que
                quiere reportar
            </h3>
            <div className='izquierdaPropilco'>
                {trus.map((tru, i) => (
                    <React.Fragment>
                        <div className='lineaPropilco'></div>
                        <br />
                        <label>SKU: </label>
                        <input
                            id={'sku-' + i}
                            className='propilcoInput'
                            type='text'
                        />
                        <label>Nombre Producto: </label>
                        <input
                            id={'nombre-' + i}
                            className='propilcoInput'
                            type='text'
                        />
                        <label>Cantidad (Kg): </label>
                        <input
                            id={'cantidad-' + i}
                            className='propilcoInput'
                            type='number'
                        />
                        <label>Indice de Fluides (%): </label>
                        <input
                            id={'indice-' + i}
                            className='propilcoInput'
                            type='number'
                        />
                        <br />
                        <br />
                    </React.Fragment>
                ))}
                <button
                    className='agregarPropilco'
                    onClick={agregar}
                    disabled={esperando}
                >
                    Agregar TRU
                </button>
                <br />
                <br />
                <button
                    className='crearActividad'
                    onClick={crearActvidad}
                    disabled={esperando}
                >
                    Crear Actividad
                </button>
            </div>
        </React.Fragment>
    );
}

export default AgregarActividad;
