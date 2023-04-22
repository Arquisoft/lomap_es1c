import React from "react";
import { IconButton } from '@mui/material';
import {useTranslation} from "react-i18next";
import FullFriendInfo from "./FullFriendInfo";
import FullscreenIcon from '@mui/icons-material/Fullscreen';

export default function AmigoCard({amigo, API_friend_calls, changeDrawerContent, setPosition, API_location_calls}) {
    const [t] = useTranslation("global");

    function showFullInfo() {
        changeDrawerContent(
            <FullFriendInfo
                amigo = {amigo}
                setPosition = {setPosition}
                changeDrawerContent = {changeDrawerContent}
                API_friend_calls = {API_friend_calls}
                API_location_calls = {API_location_calls}
            />
        )
    }

    return (
        <div>
        <div className="card--line1">
            <p key={amigo.webid+"_p"}> {amigo.name ? amigo.name : amigo.webid} </p>
            <IconButton onClick={showFullInfo}><FullscreenIcon/></IconButton>
        </div>

        <hr></hr>

        </div>
    )
}