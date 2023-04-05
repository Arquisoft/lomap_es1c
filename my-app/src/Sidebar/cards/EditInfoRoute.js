import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";

export default function EditRouteInfo({route, returnFunction, userPlaces}) {
    const [name, setName] = useState(route == null ? "" : route.name)
    const [locations, setLocations] = useState(route == null ? [] : route.locations)
    const [canSave, setCanSave] = useState(route != null)

    function handleNameChange(event) {
        setName(event.target.value)
    }

    function save() {
        // TODO: pendiente de implementar
        console.log("Pendiente de implementar")
        if (canSave) {
            // TODO: conectar a la API
        } else {
            // TODO: mostrar error
        }
    }

    function addLocation() {
        const notIncludedLocations = userPlaces.filter(location => ! locations.find((l) => l.id === location.id))
        // TODO: display locations
        // TODO: add location to list
        // TODO: conectar a la api
        console.log("pendiente")
    }

    function removeLocation(id) {
        //TODO: guardar en la api
        setLocations((current) => ([...current].filter(location => location.id != id)))
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
        <br></br>
        <div className="card--line1">
        <h3>Lugares: </h3>
        <IconButton onClick={addLocation}><AddIcon/></IconButton>
        </div>
        {locations.map(location => (
            <div className="card--line1">
                <p key={location.id}>{location.name}</p>
                <IconButton onClick={() => removeLocation(location.id)}><DeleteIcon/></IconButton>
            </div>
        ))}

        <br></br>
        
        <IconButton onClick={save}><SaveIcon/></IconButton>
        </>
    )
}