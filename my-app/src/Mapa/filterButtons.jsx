import { Button, Fab } from "@mui/material";

export default function FilterButtons() {
    return(
        <div className="filtros">
            <Fab size="medium" variant="extended">Todos</Fab>
            <Fab size="medium" variant="extended">Solo Mios</Fab>
            <Fab size="medium" variant="extended">Solo Amigos</Fab>
            <Fab size="medium" variant="extended">Elegir Amigos</Fab>
            <Fab size="medium" variant="extended">Elegir Categoria</Fab>
        </div>
    );
}