var name;
var lat;
var lng;
var colorMarker;
var category;
var photos;
var comments;

function PlaceConst(latP, lngP){
    var Place={
        lat : latP,
        lng : lngP
    }

    return Place;
}

export default PlaceConst;