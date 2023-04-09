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

const modifications = {
    ADD: "add",
    DELETE: "delete",
    REORDER: "reorder"
}

export default function EditRouteInfo({route, returnFunction, userPlaces, API_route_calls}) {
    const [name, setName] = useState(route == null ? "" : route.name)
    const [description, setDescription] = useState("")
    const [locations, setLocations] = useState(route == null ? [] : route.locations)
    const [canSave, setCanSave] = useState(route != null)
    const [anchorMenu, setAnchorMenu] = useState(false)

    function handleNameChange(event) {
        setName(event.target.value)
    }

    const [locationsModifications, setLocationsModifications] = useState([])

    function save() {
        if (canSave) {
            if (route == null) {
                // New route
                API_route_calls.API_addRoute(name, description)
            } else {
                if (name != route.name  ||  description != route.description) {
                    API_route_calls.API_updateRouteInfo(route.id, name, description)
                }
            }
            for (var modification of locationsModifications) {
                modification.execute(route.ID)
            }

            // TODO: retornar
        } else {
            // TODO: mostrar error
        }
    }

    function clickOnNewLocation(locationId) {
        setLocations((current) => [...current, userPlaces.find(l => l.id == locationId)])
        setLocationsModifications(
            (current) => 
            [...current,
                {
                    type: modifications.ADD,
                    locationID: location.id,
                    execute: (routeID) => API_route_calls.API_addLocationToRoute(routeID, location.id)
                }
            ]
        )
        setAnchorMenu(null)
    }

    function removeLocation(LocationID) {
        //TODO: guardar en la api
        setLocations((current) => (current.filter(location => location.id != LocationID)))
        
        setLocationsModifications(
            (current) => 
            // Eliminar los ADDS innecesarios
            current.filter(modification => modification.locationID!=LocationID).concat(
                {
                    type: modifications.DELETE,
                    locationID: location.id,
                    execute: (routeID) => API_route_calls.API_deleteLocationFromRoute(routeID, location.id)
                }
            )
        )
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