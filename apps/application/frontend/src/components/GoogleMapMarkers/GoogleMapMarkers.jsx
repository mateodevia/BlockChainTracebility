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
                zoom={8}
                containerStyle={containerStyle}
                initialCenter={{
                    lat: props.destino.lat,
                    lng: props.destino.lon,
                }}
                center={{
                    lat: props.destino.lat,
                    lng: props.destino.lon,
                }}
            >
                <Marker
                    position={{
                        lat: props.destino.lat,
                        lng: props.destino.lon,
                    }}
                />
                <Marker
                    position={{
                        lat: props.origen.lat,
                        lng: props.origen.lon,
                    }}
                />
            </Map>
        </div>
    );
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDiA9sL22y8i3MfkK4dAffbDrVocFwQQYw',
})(MapContainer);
