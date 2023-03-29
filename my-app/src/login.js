import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from 'react';
import "./login.css";


export default function Login(){
  return (
    <div class="mainDiv">
      <div class="logoYParrafo">
        <img src="/logoLoMap.png" class="logo" alt="Logo de LoMap"></img>
        <p class="descripción">LoMap te permite cerar mapas personalizados de los lugares que te interesan.</p>
      </div>
      <div class="formName">
        <Box className="caja" component="span">
          <Button className="btnLogin">Iniciar Sesión</Button>
        </Box>
      </div>
    </div>
  );
}
