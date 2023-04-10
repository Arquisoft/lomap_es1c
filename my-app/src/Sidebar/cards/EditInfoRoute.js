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
import LoadingButton from '@mui/lab/LoadingButton';

const modifications = {
    ADD: "add",
    DELETE: "delete",
    REORDER: "reorder"
}

export default function EditRouteInfo({route, returnFunction, userPlaces, API_route_calls}) {
    var theRouteID = route==null ? "" : route.id
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(route == null ? "" : route.name)
    const [description, setDescription] = useState("")
    const [locations, setLocations] = useState(route == null ? [] : route.locations)
    const [anchorMenu, setAnchorMenu] = useState(false)

    function handleNameChange(event) {
        setName(event.target.value)
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value)
    }

    const [locationsModifications, setLocationsModifications] = useState([])

    async function save() {
        setLoading(true)
        if (route == null) {
            theRouteID = await API_route_calls.API_addRoute(name, description)
        } else {
            if (name != route.name  ||  description != route.description) {
                API_route_calls.API_updateRouteInfo(theRouteID, name, description)
            }
        }
        for (var modification of locationsModifications) {
            modification.execute(theRouteID)
        }
        setLoading(false)
        returnFunction()
    }

    function clickOnNewLocation(locationId) {
        setLocations((current) => [...current, userPlaces.find(l => l.id == locationId)])
        setLocationsModifications(
            (current) => 
            [...current,
                {
                    type: modifications.ADD,
                    locationID: locationId,
                    execute: (routeID) => API_route_calls.API_addLocationToRoute(routeID, locationId)
                }
            ]
        )
        setAnchorMenu(null)
    }

    function removeLocation(locationId) {
        setLocations((current) => (current.filter(location => location.id != locationId)))
        
        setLocationsModifications(
            (current) => 
            // Eliminar los ADDS innecesarios
            current.filter(modification => modification.locationID!=locationId).concat(
                {
                    type: modifications.DELETE,
                    locationID: locationId,
                    execute: (routeID) => API_route_calls.API_deleteLocationFromRoute(routeID, locationId)
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
            disabled={loading}
        />
        <br></br>
        <TextField
            label = "Descripcion"
            defaultValue = {description}
            onChange={handleDescriptionChange}
            disabled={loading}
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
        

        <LoadingButton
            color="secondary"
            onClick={save}
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
        >
            <span>Save</span>
        </LoadingButton>
        </>
    )
}