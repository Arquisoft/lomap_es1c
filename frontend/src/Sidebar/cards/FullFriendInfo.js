import React, { useState } from "react";
import PlaceCard from "./PlaceCard";
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

export default function FullFriendInfo({
    amigo,
    changeDrawerContent,
    setPosition,
    API_location_calls,
    API_friend_calls
}) {
    const [loading, setLoading] = useState(false)
    
    async function deleteFriend() {
        setLoading(true)

        await API_friend_calls.API_deleteFriend(amigo.id)

        setLoading(false)
        changeDrawerContent(null)
    }

    return (
        <>
        {/* Nombre */}
        <h1>{amigo.name}</h1>
        <p>({amigo.webid})</p>

        {/* Botón de eliminar */}
        <LoadingButton
            onClick = {deleteFriend}
            loading = {loading}
            loadingPosition = "start"
            startIcon={<DeleteIcon />}
            variant = "contained"
        >
            {/* TODO: internacionalizar */}
            Eliminar amigo
        </LoadingButton>


        {/* Listado con los places de ese amigo */}
        {/* TODO: internacionalizar */}
        <h3>Lugares de ese amigo: </h3>
        {amigo.places.map(
            place =>
            <PlaceCard
                key={amigo.webid + "_placeCard_" + place.id}
                place = {place}
                changeDrawerContent = {changeDrawerContent}
                setPosition = {setPosition}
                API_location_calls = {API_location_calls}
            />
        )}
        <hr></hr>
        </>
    )
}