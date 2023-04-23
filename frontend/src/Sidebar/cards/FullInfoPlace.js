import React, { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { IconButton, Button, useThemeProps } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useTranslation } from "react-i18next";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import EditInfoPlace from './EditInfoPlace';
import LoadingButton from '@mui/lab/LoadingButton';

export default function FullInfoPlace(props) {
    const {
        place, 
        returnFunction,
        setPosition, 
        changeDrawerContent, 
        categorias, 
        API_location_calls, 
        isUserPlace, 
    } = props

    const [t] = useTranslation("global");
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [addImageLoading, setAddImageLoading] = useState(false)
    const [commentLoading, setCommentLoading] = useState(false)

    function allowEdit() {
        changeDrawerContent(
            <EditInfoPlace
                place = {place}
                changeDrawerContent = {changeDrawerContent}
                returnTo = {<FullInfoPlace {...props} />}
                categorias={categorias}
                API_location_calls = {API_location_calls}
            />
        )
    }

    function centerMapToPlace() {
        setPosition({
            lat: place.latitude,
            lng: place.longitude
        });
    }

    async function deletePlace() {
        setDeleteLoading(true)
        const response = await API_location_calls.API_deleteLocation(place.id)
        setDeleteLoading(false)
        changeDrawerContent(props.returnTo)
    }

    async function processComment() {

    }

    async function saveImages() {
        setAddImageLoading(true)

        // TODO: implement
        console.log("Pendiente")

        setAddImageLoading(false)
    }

    return (
        <>
        {/* Botón de retorno */}
        {
            props.returnTo
                &&  
            <IconButton onClick={returnFunction}>
                <ArrowBackIcon/>
            </IconButton>
        }

        {/* Nombre del lugar */}
        <h1>{place.name}</h1>
        
        {/* Categoría del lugar */}
        {/* TODO: internacionalizar */}
        <h3>Categoria:</h3>
        <p>{place.category}</p>

        {/* Reviews */}
        {/* {place.reviews  &&  place.reviews.length>0  &&  
            <>
                <h3>Reviews: </h3>
                <Swiper
                    pagination={{ type: "fraction", }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                >
                    {place.reviews.map(
                        review => (
                            <SwiperSlide>
                                <p>{review.author}</p>
                                <Rating value={(review.rating)/2.0} readOnly/>
                            </SwiperSlide>
                        )
                    )}
                </Swiper>
            </>
        } */}
        
        {/* Comments */}
        {/* {place.comments  &&  place.comments.length>0  &&
            <>
                <h3>Comentarios:</h3>
                <Swiper
                    pagination={{ type: "fraction", }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                >
                    {place.comments.map(
                        comment => 
                        (<SwiperSlide key={comment.id}>
                            <p>"{comment.text}"({comment.author})</p>
                        </SwiperSlide>)
                    )}
                </Swiper>

            </>
        } */}

        {/* Photos */}
        {/* {place.photos  &&  place.photos.length>0  &&
            <>
                <h3>Fotos:</h3>
                <Swiper
                    pagination={{ type: "fraction", }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                >
                    {place.photos.map(
                        photo =>
                        (<SwiperSlide>
                           //TODO: hacer bien
                            <img src=""/>
                        </SwiperSlide>)
                    )}
                </Swiper>
            </>
        } */}

        <br></br>
            {/* Botón de editar */}
            {
                isUserPlace
                    &&     
                <Button
                    onClick={allowEdit}
                    disabled={deleteLoading  ||  addImageLoading  ||  commentLoading}
                    startIcon={<EditIcon/>}
                    variant="contained"
                >
                    {t("sidebar.place.edit")}
                </Button>
            }

            {/* Botón de localizar */}
            <Button
                onClick={centerMapToPlace}
				disabled={deleteLoading  ||  addImageLoading  ||  commentLoading}
				startIcon={<TravelExploreIcon/>}
				variant="contained"
			>
				{t("sidebar.place.locate")}
			</Button>

            {/* Botón de borrar */}
            {
                isUserPlace
                    &&  
                <LoadingButton
                    color="secondary"
                    onClick={deletePlace}
                    loading={deleteLoading}
                    loadingPosition="start"
                    startIcon={<DeleteIcon />}
                    variant="contained"
                >
                    {t("sidebar.place.delete")}
                </LoadingButton>
            }

			<hr></hr>

        </>
    )
}