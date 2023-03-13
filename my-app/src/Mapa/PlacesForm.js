import Modal from 'react-modal';
import React from "react";
import {addPlace,getPlaces} from '../Places/Places';
import PlaceConst from "../Places/Place";


export default function CreateModal({isOpen,latMark,lngMark,setIsOpen,setMarkers,setStateButton,setPlaces}){
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
        subtitle.style.textAlign  = "center";
        subtitle.style.marginTop  = 0;
        form.style.display = "grid";
        form.style.gridTemplateColumns = "30% 60%";
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
        background: '#1B3A4B',
        },
    };

    //Constantes para los campos del form
    const [nombre, setNombre] = React.useState('');
    const [valoracion, setValoracion] = React.useState('');
    const [categoria, setCategoria] = React.useState('Sin categoria');
    const [privacidad, setPrivacidad] = React.useState('Publico');
    const [comentario, setComentario] = React.useState('');
  
    function handleNameChange (e) {
      setNombre(e.target.value);
    }
  
    function handleValChange (e) {
      setValoracion(e.target.value);
    }

    function handleCategoryChange (e) {
      setPrivacidad(e.target.value);
    }

    function handlePrivacyChange (e) {
      setCategoria(e.target.value);
    }

    function handleCommentChange (e) {
      setComentario(e.target.value);
    }

    //Cierra el modal y pone todos los valores de los campos a su valor por defecto.
    function closeModal() {
        setNombre('');
        setValoracion('');
        setIsOpen(false);
    }

    //Una vez se le da a el boton de añadir se añade un marcador a la lista y los recarga para que estos se vean en el mapa
    //La lista se vacia primero para que no de error de dos puntos con el mismo id, quizas no es la mejor manera.
    // TODO: ahora mismo no tenemos una single source of truth
    function chargeMarckers(){
        var chargePlaces = [];
        chargePlaces = getPlaces();
        setPlaces([]);
        for (let i = 0; i < chargePlaces.length; i++) {
          setPlaces((current) => [...current,
            {
              ...chargePlaces[i]
              // lat: chargePlaces[i].lat,
              // lng: chargePlaces[i].lng,
              // name: chargePlaces[i].nombre,
            },
          ]);
        }
      }

    //Comprueba que todos los campos esten correctos, añade el punto a la lista de puntos,restea los valores por defecto del formulario
    //Y recarga los puntos del mapa para que se vean los nuevos.
    function addPlaceModal(){
        setMarkers([]);
        if(nombre.trim().length <= 0){
            alert("El nombre no puede estar vacio");
        }else if(Number(valoracion) < 0 || Number(valoracion) > 5){
            alert("La puntuación tiene que ser mayor de 0 y menor de 5");
        }else{
            setStateButton(true);
            addPlace(PlaceConst(latitudeMark,longitudeMark,nombre,valoracion,categoria,privacidad,comentario));
            setNombre('');
            setValoracion('');
            setIsOpen(false);
            chargeMarckers();
        }
    }
      
  return(
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Add Point Modal"
    >
      <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Añade el Punto a el Mapa</h2>
      <form ref={(_form) => (form = _form)}>
        <label htmlFor="nombre">Nombre:  
        </label>
        <input type="text" name="nombre" placeholder="Nombre" value={nombre} onChange={handleNameChange} />
        <label htmlFor="puntuacion">Puntuación:  
        </label>
        <input type="number" min='0' max='5' step='0.1' name="puntuacion" placeholder="Valoración de 0.0-5.0" value={valoracion} onChange={handleValChange} />
        <label htmlFor="categoria">Categoria:  
        </label>
        <select id="categoria" name="categoria" onChange={handleCategoryChange}>
          <option defaultValue="empty"></option>
          {categoriasStr.map( categoria => <option value={categoria.toLowerCase()}>{categoria}</option>)}
        </select>
        <label htmlFor="nivelPrivacidad">Privacidad:  
        </label>
        <select id="nivelPrivacidad" name="nivelPrivacidad" onChange={handlePrivacyChange}>
          <option defaultValue="empty"></option>
          {nivelesPrivacidad.map( nivel => <option value={nivel.toLowerCase()}>{nivel}</option>)}
        </select>
        <label htmlFor="comentarios">Comentario: 
        </label>
        <textarea id="comentarios" name="comentarios" onChange={handleCommentChange} />
      </form>
      <div className="submitFormLugares">
          <button className="btn" onClick={addPlaceModal}>Añadir</button>
          <button className="btnCancel" onClick={closeModal}>Cancelar</button>
      </div>
    </Modal>
  )
}