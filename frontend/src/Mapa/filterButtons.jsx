import {  Fab, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import {useTranslation} from "react-i18next"

export default function FilterButtons({setCategortFiltered, categorias,setFriendsFilter,setOnlyMineFilter}) {
    const [t] = useTranslation("global");
    const [anchorEl, setAnchorEl] = useState(null);
    const [categorySelected, setCategorySelected] = useState(0);
    const open = Boolean(anchorEl);

    const resetFilters = () => {
        setCategortFiltered({
            activated: false,
            category: ""
        })
        setFriendsFilter(false);
        setOnlyMineFilter(false);
    }

    const handleClickOnlyMine =(event) => {
        setOnlyMineFilter(true);
        setFriendsFilter(false);
    };

    const handleClickFriends =(event) => {
        setFriendsFilter(true);
        setOnlyMineFilter(false);
    };

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
            <Fab size="medium" variant="extended" onClick={resetFilters} data-testid="resetFilters">{t("filters.all")}</Fab>
            <Fab size="medium" variant="extended" onClick={handleClickOnlyMine} data-testid="handleClickOnlyMine">{t("filters.mine")}</Fab>
            <Fab size="medium" variant="extended" onClick={handleClickFriends} data-testid="handleClickFriends">{t("filters.friends")}</Fab>
            <Fab size="medium" variant="extended" id="categoryDisplay" onClick={handleClick} data-testid="categoryDisplay">{t("filters.chooseCategoty")}</Fab>

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
              data-testid="menu"
           >
                <MenuItem key={"todas"} onClick={() => {handleAllClose(); setCategorySelected(0)}} selected={categorySelected === 0} 
                data-testid="todas">
                    {t("filters.allCategories")}
                </MenuItem>
                {categorias.map((option) => (
                    <MenuItem key={option} onClick={() => {handleClose(option); setCategorySelected(categorias.indexOf(option)+2)}} 
                        selected={categorySelected === categorias.indexOf(option)+2} data-testid={"category"+categorias.indexOf(option)}>
                        {t("categories."+option)}
                    </MenuItem>
                ))}
            </Menu>

        </div>
    );
}