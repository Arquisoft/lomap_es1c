import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { IconButton, Tooltip } from '@mui/material';
import Rating from '@mui/material/Rating';
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import EditInfoPlace from './EditInfoPlace';
import axios from "axios";

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

export default function FullInfoPlace({place, returnFunction,setPosition, changeDrawerContent, categorias, centerMapToCoordinates, API_location_calls}) {
    const [t] = useTranslation("global");
    function allowEdit() {
        changeDrawerContent(
            <EditInfoPlace
                place = {place}
                changeDrawerContent = {changeDrawerContent}
                returnFunction = {() => changeDrawerContent(this)}
                categorias={categorias}
                API_location_calls = {API_location_calls}
            />
        )
    }

    function centerMapToPlace() {
        setPosition({
            lat: place.lat,
            lng: place.lng
        });
    }

    function deletePlace() {
        const url = "http://localhost:8080/location/"+place.id;
		const config = {
			withCredentials: true,
		};
		axios.delete(url, config);
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

        <Tooltip title={t("sidebar.place.edit")} placement="bottom"><IconButton onClick={allowEdit}><EditIcon/></IconButton></Tooltip>
        <Tooltip title={t("sidebar.place.locate")} placement="bottom"><IconButton onClick={centerMapToPlace}><TravelExploreIcon/></IconButton></Tooltip>
        <Tooltip title={t("sidebar.place.delete")} placement="bottom"><IconButton onClick={deletePlace}><DeleteIcon/></IconButton></Tooltip>
        </>
    )
}