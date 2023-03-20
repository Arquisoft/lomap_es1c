var places = [];

export function addPlace(place){
    if(!places.some(value => value.id===place.id)){
        places[places.length] = place;
    }
    
    places.forEach(elemento => 
        {
            //console.log(elemento);
        });
        console.log(places.length);
}

export function getPlaces(){
    return places;
}

export default addPlace;