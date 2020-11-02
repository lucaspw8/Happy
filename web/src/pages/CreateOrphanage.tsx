import React, {FormEvent, useState, ChangeEvent} from "react";
import { useHistory } from "react-router-dom";
import { Map, Marker, TileLayer } from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';
import {FiPlus } from "react-icons/fi";



import '../styles/pages/create-orphanage.css';
import Sidebar from "../components/sidebar";
import mapIcon from "../util/mapIcon";
import api from "../services/api";


export default function CreateOrphanage() {
  const history = useHistory();

  const [position, setPosition] = useState({latitude: 0, longitude: 0});

  //Campos do formulario
  const [name, setName]                       = useState('');
  const [about, setAbout]                     = useState('');
  const [instructions, setInstructions]       = useState('');
  const [opening_hours, setOpeningHours]      = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages]                   = useState<File[]>([]);
  const [previewImages, setPreviewImages]     = useState<string[]>([])

  //Submeter formulario
  async function submitForm(event: FormEvent){
    event.preventDefault();
    const {latitude,longitude} = position;

    const data = new FormData();
    data.append('name', name);
    data.append('about', about);
    data.append('latitude',String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image =>{
      
      data.append('images', image);
    })
    console.warn("imagem ", data);
    console.log(
      { name,
       about,
       latitude,
       longitude,
       instructions,
       opening_hours,
       open_on_weekends,
       images,
       data
     }
     )

    await api.post('orfanatos', data)

    alert("Cadastrado com sucesso!");
    history.push('/app')
  
  }

  //Escolher fotos
  function selectImages(event: ChangeEvent<HTMLInputElement>){
    if(!event.target.files){
      return;
    }

    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);

    const selectedImagePreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    })

    setPreviewImages(selectedImagePreview);
  }
  
  //Clique no mapa para setar a localização
  function clickOnMap(event: LeafletMouseEvent){
    const {lat, lng} = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    })
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar/>

      <main>
        <form onSubmit={submitForm} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-6.6076772,-39.0603084]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={clickOnMap}
            >
              <TileLayer 
                url={"https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"}
              />
              { position.latitude !== 0 && 
                (
                  <Marker 
                    interactive={false} 
                    icon={mapIcon} 
                    position={[position.latitude,position.longitude]} 
                  />
                )
              }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                value={name} 
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
              id="name" 
              maxLength={300}
              value={about} 
              onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image =>{
                  return (
                    <img key={image} src={image} alt={name}/>
                  )
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

              </div>
              <input multiple onChange={selectImages} type="file" id="image[]"/>

              
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions"
                value={instructions} 
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input 
              id="opening_hours" 
              value={opening_hours} 
              onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                type="button" 
                className={open_on_weekends ? "active" : ''}
                onClick={() => setOpenOnWeekends(true)}>
                  Sim
                </button>
                
                <button 
                type="button"
                className={!open_on_weekends ? "active" : ''}
                onClick={() => setOpenOnWeekends(false)}>
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
