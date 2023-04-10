import React from "react";
import AmigoCard from "./cards/AmigoCard";
import { useTranslation } from "react-i18next";
import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddFriendContent from './AddFriendContent';

export default function AmigosTabContent({amigos, API_friend_calls, changeDrawerContent}) {
    const [t] = useTranslation("global")

    function handleClickOnAddFriend(event) {
        changeDrawerContent(
            <AddFriendContent
                API_friend_calls = {API_friend_calls}
                returnFunction = {() => changeDrawerContent(this)}
            />
        )
    }

    return (
        <div className="tabcontent">
            <h1 id="centered">{t("sidebar.tabs.friend-content.title")}</h1>

            <IconButton onClick={handleClickOnAddFriend}><AddIcon/></IconButton>

            {amigos.map(
                amigo =>
                <AmigoCard
                    key = {amigo.webid}
                    amigo = {amigo}
                    API_friend_calls = {API_friend_calls}
                />
            )}


        </div>
    )
}