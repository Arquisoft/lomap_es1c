import React, { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditInfoPlace from './EditInfoPlace';
import Rating from '@mui/material/Rating';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// TODO eliminar datos hardcodeados
const images = [
{
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
    'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
},
{
    label: 'Bird',
    imgPath:
    'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
},
{
    label: 'Bali, Indonesia',
    imgPath:
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
},
{
    label: 'Goč, Serbia',
    imgPath:
    'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
},
{
    label: 'Goč, Serbia',
    imgPath:
    'https://external-preview.redd.it/s6GPQfLEwj9-i-EQcfuQb8JBqRV3E8h1iJ0hCTzYOzE.jpg?auto=webp&v=enabled&s=46f24037b6c6c992cb02f15f8a5e607da97b06e2',
},
{
    label: 'Goč, Serbia',
    imgPath:
    'https://blog.foto24.com/wp-content/uploads/2019/02/6-fotografia-de-Alejandro-Rodriguez-683x1024.jpg',
},
];

export default function FullInfoPlace({place, returnFunction, changeDrawerContent, categorias, centerMapToCoordinates}) {
    function allowEdit() {
        changeDrawerContent(
            <EditInfoPlace
                place = {place}
                changeDrawerContent = {changeDrawerContent}
                returnFunction = {() => changeDrawerContent(this)}
                categorias={categorias}
            />
        )
    }

    function centerMapToPlace() {
        centerMapToCoordinates(place.lat, place.lng)
    }

    function deletePlace() {
        // TODO: pendiente de implementar
    }

    return (
        <>
        <IconButton onClick={returnFunction}><ArrowBackIcon/></IconButton>
        <h1>{place.name}</h1>
        
        {place.valoracion ? <Rating value={place.valoracion} readOnly/> : <Rating value={place.valoracion} disabled/>}

        <h3>Categoria:</h3>
        <p>{place.categoria}</p>

        <h3>Comentario:</h3>
        <p></p>

        <h3>Fotos:</h3>
        <Swiper
            pagination={{ type: "fraction", }}
            navigation={true}
            modules={[Pagination, Navigation]}
        >
            {/* TODO: reemplazar por las imágenes del lugar */}
            {images.map(
                i => 
                (<SwiperSlide key={i.imgPath+"slide"}><img src={i.imgPath}/></SwiperSlide>)
            )}
        </Swiper>

        <IconButton onClick={allowEdit}><EditIcon/></IconButton>
        <IconButton onClick={centerMapToPlace}><TravelExploreIcon/></IconButton>
        <IconButton><DeleteIcon/></IconButton>
        </>
    )
}