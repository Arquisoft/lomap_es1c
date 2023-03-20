import { Box } from "@mui/system";
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Box
    component="img"
    sx={{
        height: 233,
        width: 350,
    }}
    alt="Logo de LoMap."
    src="../public/logoLoMap.png"
    />
  </React.StrictMode>
);
