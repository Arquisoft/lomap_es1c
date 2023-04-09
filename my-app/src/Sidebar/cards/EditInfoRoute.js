import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function EditRouteInfo({route, returnFunction, userPlaces}) {
    const [name, setName] = useState(route == null ? "" : route.name)
    const [locations, setLocations] = useState(route == null ? [] : route.locations)
    const [canSave, setCanSave] = useState(route != null)
    const [anchorMenu, setAnchorMenu] = useState(false)

    function handleNameChange(event) {
        setName(event.target.value)
    }

    function save() {
        // TODO: pendiente de implementar ¿De verdad necesito hacer objetos command?
        console.log("Pendiente de implementar")
        if (canSave) {
            // TODO: conectar a la API
        } else {
            // TODO: mostrar error
        }
    }

    function clickOnNewLocation(locationId) {
        setLocations((current) => [...current, userPlaces.find(l => l.id == locationId)])
        setAnchorMenu(null)
        // TODO: conectar con la api
        console.log("Conectar con la API")
    }

    function removeLocation(id) {
        //TODO: guardar en la api
        setLocations((current) => (current.filter(location => location.id != id)))
        console.log("pendiente de juntar a la api")
    }

    return (
        <>
        <IconButton onClick={returnFunction}><ArrowBackIcon/></IconButton>
        <br></br>
        <TextField
            label = "Título"
            defaultValue = {name}
            onChange={handleNameChange}
        />
        <div className="card--line1">
        <h3>Lugares: </h3>
        <IconButton onClick={(event) => (setAnchorMenu(event.currentTarget))}><AddIcon/></IconButton>
        </div>

        <Menu
            anchorEl = {anchorMenu}
            open = {Boolean(anchorMenu)}
            onClose={() => setAnchorMenu(null)}
        >
            {userPlaces
            .filter(location => ! locations.find((l) => l.id === location.id))
            .map((location) => (
                <MenuItem key={location.id + "mnitem"} onClick={() => clickOnNewLocation(location.id)}>
                    {location.name}
                </MenuItem>
            ))}
        </Menu>

        {locations.map(location => (
            <div key={location.id+"div"} className="card--line1">
                <p key={location.id}>{location.name}</p>
                <IconButton key={location.id+"db"} onClick={() => removeLocation(location.id)}><DeleteIcon/></IconButton>
            </div>
        ))}

        <br></br>
        
        <IconButton onClick={save}><SaveIcon/></IconButton>
        </>
    )
}