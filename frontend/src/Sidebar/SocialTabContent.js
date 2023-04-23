import React from "react";
// import AmigoCard from "./cards/AmigoCard";
import { useTranslation } from "react-i18next";
import { Button } from '@mui/material';
import AddFriendContent from './AddFriendContent';
import SolicitudesContent from "./social/SolicitudesContent";
import SeguidosContent from "./social/SeguidosContent";

// TODO: mover a APP
const amigos = [
    {webId: "1", name: "David"},
    {webId: "22", name: "Damián"},
    {webId: "333", name: "Miguel"},
    {webId: "4444", name: "Miguel"},
]

export default function AmigosTabContent(props) {
    const {_amigos, API_friend_calls, changeDrawerContent, API_location_calls, setPosition, solicitudes} = props
    const [t] = useTranslation("global")

    function handleClickOnAddFriend() {
        changeDrawerContent(
            <AddFriendContent
                API_friend_calls = {API_friend_calls}
                returnFunction = {() => changeDrawerContent(this)}
            />
        )
    }

    function handleClickOnAmigos() {
        changeDrawerContent(
            <SeguidosContent
                API_friend_calls = {API_friend_calls}
                amigos = {amigos}
                returnTo = { <AmigosTabContent {...props} /> }
                changeDrawerContent = {changeDrawerContent}
                API_location_calls = {API_location_calls}
                setPosition = {setPosition}
            />
        )
    }

    function handleClickOnSolicitudes() {
        changeDrawerContent(
            <SolicitudesContent
                API_friend_calls = {API_friend_calls}
                solicitudes = {solicitudes}
                returnTo = { <AmigosTabContent {...props} /> }
                changeDrawerContent = {changeDrawerContent}
            />
        )
    }

    return (
        <div className="tabcontent">
            <h1 id="centered">Social</h1>

            <Button
                variant="contained"
                onClick={handleClickOnAddFriend}
            >
                {/* TODO internacionalizar */}
                Crear petición de solicitud
            </Button>

            <Button
                variant="contained"
                onClick={handleClickOnAmigos}
            >
                {/* TODO internacionalizar */}
                Amigos
            </Button>

            <Button
                variant="contained"
                onClick={handleClickOnSolicitudes}
            >
                {/* TODO internacionalizar */}
                Solicitudes
            </Button>
        </div>
    )
}