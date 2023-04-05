import {  Fab } from "@mui/material";
import {useTranslation} from "react-i18next"

export default function FilterButtons() {
    const [t, i18n] = useTranslation("global");

    return(
        <div className="filtros">
            <Fab size="medium" variant="extended">{t("filters.all")}</Fab>
            <Fab size="medium" variant="extended">{t("filters.mine")}</Fab>
            <Fab size="medium" variant="extended">{t("filters.friends")}</Fab>
            <Fab size="medium" variant="extended">{t("filters.chooseFriends")}</Fab>
            <Fab size="medium" variant="extended">{t("filters.chooseCategoty")}</Fab>
        </div>
    );
}