import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {FiPlus,FiArrowRight} from 'react-icons/fi';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';


import mapMarkerimg from '../images/map-marker.svg'

import '../styles/pages/orfanatosMap.css';
import mapIcon from '../util/mapIcon';
import api from '../services/api';

function OrfanatosMap(){
    interface Orfanato{
        id: number;
        latitude: number;
        longitude: number;
        name: string;

    }

   const [orfanatos, setOrfanatos] = useState<Orfanato[]>([]);

    useEffect(()=>{
        api.get("orfanatos").then(response => {
            setOrfanatos(response.data);
        })
    }, []);

    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerimg} alt="Happy"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                <footer>
                    <strong>Cedro</strong>
                    <span>Ceará</span>
                </footer>
            </aside>

            <Map center={[-6.6076772,-39.0603084]} 
            zoom={15} 
            style={{
                width: '100%',
                height: '100%'
            }}>
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
             
             {orfanatos.map(orfanato =>{
                 {console.log(orfanato)}
                 return (
                    <Marker 
                        position={[orfanato.latitude,orfanato.longitude]}
                        
                        icon= {mapIcon}
                        key={orfanato.id}
                    >
                        <Popup 
                        closeButton={false} 
                        minWidth={240}
                        maxWidth={240}
                        className= "map-popup">
                            {orfanato.name}
                            <Link to={`/orphanage/${orfanato.id}`}>
                                <FiArrowRight size={20} color="#fff"/>
                            </Link>
                        </Popup>
                    </Marker>
                 )
             })}

            </Map>
            
            <Link to='/orphanage/create' className="create-orfanato">
                <FiPlus size={32} color="#fff"/>
            </Link>
        </div>
    );
}
export default OrfanatosMap;