import React from "react";
import PlaceCard from "./PlaceCard";

export default function FullFriendInfo({
    amigo,
    changeDrawerContent,
    setPosition,
    API_location_calls,
    API_friend_calls
}) {
    return (
        <>
        {/* Info del amigo */}

        {/* Nombre */}

        {/* Botón de editar */}

        {/* Botón de eliminar */}


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