function PlaceConst(latP, lngP,nameP,valoracionP,categoriaP,privacidadP,comentarioP){
    var Place={
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