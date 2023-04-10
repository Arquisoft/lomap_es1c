function PlaceConst(idP,latP, lngP,nameP,valoracionP,categoriaP,privacidadP,comentarioP){
    var Place={
        id : idP,
        lat : latP,
        lng : lngP,
        name : nameP,
        valoracion : valoracionP,
        categoria : categoriaP,
        privacidad : privacidadP,
        comentario : comentarioP
    }

    return Place;
}

export default PlaceConst;