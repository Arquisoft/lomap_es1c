import React, { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { IconButton, Button } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useTranslation } from "react-i18next";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import EditInfoPlace from './EditInfoPlace';
import LoadingButton from '@mui/lab/LoadingButton';

export default function FullInfoPlace({place, returnFunction,setPosition, changeDrawerContent, categorias, API_location_calls}) {
    const [t] = useTranslation("global");
    // TODO: asignar correcto valor a la variable
    const isUserPlace = place.author
    const [loading, setLoading] = useState(false)

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
            lat: place.latitude,
            lng: place.longitude
        });
    }

    async function deletePlace() {
        setLoading(true)
        const response = await API_location_calls.API_deleteLocation(place.id)
        setLoading(false)
        returnFunction()
    }

    return (
        <>
        <IconButton onClick={returnFunction}><ArrowBackIcon/></IconButton>
        <h1>{place.name}</h1>
        
        <h3>Categoria:</h3>
        <p>{place.category}</p>

        {place.reviews  &&  place.reviews.length>0  &&  
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
        }
        
        {place.comments  &&  place.comments.length>0  &&
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
        }

        {place.photos  &&  place.photos.length>0  &&
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
                            {/* TODO: añadir un SwiperSlide por cada imagen */}
                            <img src=""/>
                        </SwiperSlide>)
                    )}
                </Swiper>
            </>
        }

        <br></br>

            <Button
                onClick={allowEdit}
				disabled={loading}
				startIcon={<EditIcon/>}
				variant="contained"
			>
				{t("sidebar.place.edit")}
			</Button>

            <Button
                onClick={centerMapToPlace}
				disabled={loading}
				startIcon={<TravelExploreIcon/>}
				variant="contained"
			>
				{t("sidebar.place.locate")}
			</Button>

            {
                isUserPlace
                    &&  
                <LoadingButton
                    color="secondary"
                    onClick={deletePlace}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<DeleteIcon />}
                    variant="contained"
                >
                    {t("sidebar.place.delete")}
                </LoadingButton>
            }
        </>
    )
}