import React, { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';

export default function AddFriendContent({API_friend_calls, returnFunction}) {
    const [name, setName] = useState("")
    const [webID, setWebID] = useState("")
    
    function addFriend() {
        if (name.trim()!=""  &&  webID.trim()!="") {
            API_friend_calls.API_addFriend(name, webID)
            returnFunction()
        } else {
            console.log("Los campos son obligatorios")
        }
    }

    return (
        <>
        <IconButton onClick={returnFunction}><ArrowBackIcon/></IconButton>

        <br></br>

        <TextField
            label="Nombre"
            onChange={(event) => setName(event.target.value)}
        />

        <br></br>

        <TextField
            label="WebID"
            onChange={(event) => setWebID(event.target.value)}
        />

        <br></br>

        <IconButton onClick={addFriend}><SaveIcon/></IconButton>
        </>
    )
}