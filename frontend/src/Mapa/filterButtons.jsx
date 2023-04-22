import {  Fab, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import {useTranslation} from "react-i18next"

export default function FilterButtons({setCategortFiltered, categorias}) {
    const [t] = useTranslation("global");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const resetFilters = () => {
        setCategortFiltered({
            activated: false,
            category: ""
        })
    }

    const handleClick =(event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (option) => {
        setAnchorEl(null);
        setCategortFiltered({
            activated: true,
            category: option
        })
    };

    const handleDefaultClose = () => {
        setAnchorEl(null);
    };

    const handleAllClose = () => {
        setAnchorEl(null);
        setCategortFiltered({
            activated: false,
            category: ""
        })
    };

    return(
        <div className="filtros">
            <Fab size="medium" variant="extended" onClick={resetFilters}>{t("filters.all")}</Fab>
            <Fab size="medium" variant="extended">{t("filters.mine")}</Fab>
            <Fab size="medium" variant="extended">{t("filters.friends")}</Fab>
            <Fab size="medium" variant="extended" id="categoryDisplay" onClick={handleClick}>{t("filters.chooseCategoty")}</Fab>

            <Menu
            MenuListProps={{
                'aria-labelledby': 'categoryDisplay',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleDefaultClose}
              PaperProps={{
                style: {
                  maxHeight: 56 * 4.5,
                  width: '22ch',
                },
              }}
           >
                <MenuItem key={"todas"} onClick={() => handleAllClose()}>
                        Todas las Categorias
                </MenuItem>
                <MenuItem key={"sin categoria"} onClick={() =>handleClose("sin categoria")}>
                        Sin Categoria
                </MenuItem>
                {categorias.map((option) => (
                    <MenuItem key={option} onClick={() => handleClose(option)}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>

        </div>
    );
}