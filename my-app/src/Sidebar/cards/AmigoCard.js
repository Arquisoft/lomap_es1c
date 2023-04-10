import React from "react";
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useTranslation} from "react-i18next"

export default function AmigoCard({amigo, API_friend_calls}) {
    const [t] = useTranslation("global");

    async function deleteFunc() {
        await API_friend_calls.API_deleteFriend(amigo.webid)
    }

    return (
        <div>
        <div className="card--line1">
            <p key={amigo.webid}>
                {(amigo.name  &&  amigo.name!=null) ? amigo.name : amigo.webid}
            </p>

            <Tooltip title={t("sidebar.place.delete")} placement="bottom"><IconButton onClick={deleteFunc}><DeleteIcon/></IconButton></Tooltip>

        </div>
        <hr></hr>
        </div>
    )
}