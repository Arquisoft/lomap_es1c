var places = [];

export function addPlace(place){
    places[places.length] = place;
    places.forEach(elemento => 
        {
            console.log(elemento);
        });
}

export function getPlaces(){
    return places;
}

export default addPlace;