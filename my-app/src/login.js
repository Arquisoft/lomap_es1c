import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from 'react';
import "./login.css";


export default function Login({logInFunction}){
  function escribeSolid() {
    setRutaText("https://solidcommunity.net/login");
    //"https://solidcommunity.net/login"
  }
  function escribeInrupt() {
    setRutaText("https://login.inrupt.com/");
    //"https://login.inrupt.com/"
  }

  const [rutaText, setRutaText] = useState("")
  return (
    <div class="mainDiv">
      <div class="logoYParrafo">
        <img src="/logoLoMap.png" class="logo" alt="Logo de LoMap"></img>
        <p class="descripción">LoMap te permite cerar mapas personalizados de los lugares que te interesan.</p>
      </div>
      <div class="formName">
        <Box className="caja" component="span">
          <TextField
            InputProps={{ className: "MuiInputBase-input" }}
          ></TextField>
          <div>
            <Button className="btnLogin" onClick={escribeInrupt}>Inrupt</Button>
            <Button className="btnLogin" onClick={escribeSolid}>Solid</Button>
          </div>

          <Button className="btnLogin" onClick={logInFunction}>Iniciar Sesión</Button>
        </Box>
      </div>
    </div>
  );
}
