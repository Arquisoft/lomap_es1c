import Modal from 'react-modal';
import React from "react";
import addPlace, { getPlaces } from '../Places/Places';
import PlaceConst from '../Places/Place';
import { v4 as uuidv4 } from 'uuid';
import { Button, MenuItem, Rating, Select, TextField } from '@mui/material';
import "./muiComps.css"
import axios from 'axios';


export default function CreateModal({ isOpen, latMark, lngMark, setIsOpen, setMarkers, setStateButton, setPlaces, setCanCick }) {
  const categoriasStr = ["Vivienda", "Restaurante", "Bar", "Gimnasio", "Supermercado", "Parque", "Zona Recreativa", "Otros"]
  const nivelesPrivacidad = ["Publico", "Solo Amigos", "Privado"]

  Modal.setAppElement(document.getElementsByClassName('map-conteiner')[0]);
  //Constantes para abrir y cerrar el modal.
  const modalIsOpen = isOpen;
  const latitudeMark = latMark;
  const longitudeMark = lngMark;

  let subtitle;
  let form;

  //Estilo de los componentes del modal una vez se abren
  function afterOpenModal() {
    subtitle.style.color = '#8118F8';
    subtitle.style.textAlign = "center";
    subtitle.style.marginTop = 0;
    form.style.display = "grid";
    form.style.gridTemplateColumns = "auto";
    form.style.marginBottom = "10px";
  }

  //Estilos del modal
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: '#1e2124',
      color: "#f7f7f7"
    },
  };

  //Constantes para los campos del form
  const [nombre, setNombre] = React.useState('');
  const [valoracion, setValoracion] = React.useState(0);
  const [categoria, setCategoria] = React.useState('Sin categoria');
  const [privacidad, setPrivacidad] = React.useState('Publico');
  // const [fotos, setFotos] = React.useState('');
  const [comentario, setComentario] = React.useState('');

  function handleNameChange(e) {
    setNombre(e.target.value);
  }

  function handleValChange(e) {
    setValoracion(e.target.value);
  }

  function handleCategoryChange(e) {
    setCategoria(e.target.value);
  }

  function handlePrivacyChange(e) {
    setPrivacidad(e.target.value);
  }

  // function handleFotoChange (e) {
  //   setFotos(e.target.value);
  // }

  function handleCommentChange(e) {
    setComentario(e.target.value);
  }

  //Cierra el modal y pone todos los valores de los campos a su valor por defecto.
  function closeModal() {
    setNombre('');
    setValoracion('');
    setIsOpen(false);
    setMarkers([]);
    setCanCick(false);
  }

  const [data, setData] = React.useState('');

  //Una vez se le da a el boton de añadir se añade un marcador a la lista y los recarga para que estos se vean en el mapa
  //La lista se vacia primero para que no de error de dos puntos con el mismo id, quizas no es la mejor manera.
  // TODO: ahora mismo no tenemos una single source of truth
  function chargeMarckers() {
    var chargePlaces = [];
    
    axios.get('http://localhost:8080/location')
      .then(response => {
        setData(response.data);
      })

    console.log(data);
    chargePlaces = data;
    console.log(chargePlaces);
    setPlaces([]);
    for (let i = 0; i < chargePlaces.length; i++) {
      setPlaces((current) => [...current,
      {
        ...chargePlaces[i]
      },
      ]);
    }
  }

  //Comprueba que todos los campos esten correctos, añade el punto a la lista de puntos,restea los valores por defecto del formulario
  //Y recarga los puntos del mapa para que se vean los nuevos.
  function addPlaceModal() {
    setMarkers([]);
    if (nombre.trim().length <= 0) {
      alert("El nombre no puede estar vacio");
    } else if (Number(valoracion) < 0 || Number(valoracion) > 5) {
      alert("La puntuación tiene que ser mayor de 0 y menor de 5");
    } else {
      setStateButton(true);
      var id = uuidv4();
      console.log(latitudeMark)
      //addPlace(PlaceConst(id, latitudeMark, longitudeMark, nombre, valoracion, categoria, privacidad, comentario));
      addPlaceApi(nombre, latitudeMark, longitudeMark, categoria);
      setNombre('');
      setValoracion('');
      setIsOpen(false);
      chargeMarckers();
      setCanCick(false);
    }
  }

  function addPlaceApi(nombreP,latitudeMarkP, longitudeMarkP, categoriaP){
    console.log(latitudeMarkP)
    axios.post('http://localhost:8080/location', {
      name: nombreP,
      address:"Oviedo",
      latitude: latitudeMarkP,
      longitude: longitudeMarkP,
      category: categoriaP
    });
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Add Point Modal"
    >
      <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Añade el Punto a el Mapa</h2>
      <form ref={(_form) => (form = _form)}>

        <TextField id="filled-basic" className='nombre' label="Nombre" variant="outlined" 
        type="text" name="nombre" value={nombre} onChange={handleNameChange}/>

        <label htmlFor="puntuacion">Puntuación:
        </label>
        <Rating 
          defaultValue={2.5} className="rating" precision={0.5} name="simple-controlled" value={Number(valoracion)} onChange={handleValChange} />

        <label htmlFor="categoria">Categoria:
        </label>
        <Select 
          id="categoria" className="categoria" defaultValue="" name="categoria" onChange={handleCategoryChange}>
          <MenuItem defaultValue="empty"></MenuItem>
          {categoriasStr.map(categoria => <MenuItem value={categoria.toLowerCase()}>{categoria}</MenuItem>)}
        </Select>

        <label htmlFor="nivelPrivacidad">Privacidad:
        </label>

        <Select 
          id="nivelPrivacidad" className='privacidad' defaultValue="" name="nivelPrivacidad" onChange={handlePrivacyChange}>
          <MenuItem defaultValue=""></MenuItem>
          {nivelesPrivacidad.map(nivel => <MenuItem value={nivel.toLowerCase()}>{nivel}</MenuItem>)}
        </Select>

        {/* <label htmlFor="fotos">Fotos:  
        </label>
        <input type="file" name="fotos" id="fotos" placeholder="Escoja las imagenes" onChange={handleFotoChange}/> */}

        <label htmlFor="comentarios">Comentario:
        </label>
        <TextField id="comentarios" placeholder='Puede añadir un comentario' name="comentarios"
           onChange={handleCommentChange} className="comentario" multiline rows={8}/>
      </form>
      <div className="submitFormLugares">
        <Button className="btn" onClick={addPlaceModal}>Añadir</Button>
        <Button className="btnCancel" onClick={closeModal}>Cancelar</Button>
      </div>
    </Modal>
  )
}