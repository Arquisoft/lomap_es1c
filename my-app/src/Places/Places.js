var places = [];

export function addPlace(place){
    if(!places.some(value => value.id===place.id)){
        places[places.length] = place;
    }
}

export function getPlaces(){
    return places;
}

export default addPlace;