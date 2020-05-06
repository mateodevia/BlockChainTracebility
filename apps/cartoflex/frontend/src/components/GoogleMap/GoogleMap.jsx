import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

function MapContainer(props) {
    const containerStyle = {
        position: 'relative',
        width: 'inherit',
        height: 'inherit',
    };

    return (
        <div className='mapDetalle'>
            <Map
                google={props.google}
                zoom={18}
                containerStyle={containerStyle}
                initialCenter={{
                    lat: props.ubicacion.lat,
                    lng: props.ubicacion.lon,
                }}
                center={{
                    lat: props.ubicacion.lat,
                    lng: props.ubicacion.lon,
                }}
            >
                <Marker
                    position={{
                        lat: props.ubicacion.lat,
                        lng: props.ubicacion.lon,
                    }}
                />
            </Map>
        </div>
    );
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDiA9sL22y8i3MfkK4dAffbDrVocFwQQYw',
})(MapContainer);
