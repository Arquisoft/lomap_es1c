const Route = require("../models/Route");
const Location = require("../models/Location");
const Friend = require("../models/Friend");
const friends = [
    new Friend(null,'https://example.com/alice'),
    new Friend(null,'https://example.com/luis'),
    new Friend("Jorge",'https://example.com/jorge'),
    new Friend(null,'https://example.com/jaime'),
    new Friend("David",'https://example.com/david')
];

const location1 = new Location('1', 'Parque San Francisco', 'El Palomar', 43.361444061368786, -5.850460182754155, 'Parque',  4, ['Lugar muy bonito'] , ['https://www.example.com/photo1.jpg']);
const location2 = new Location('2', 'Catedral de León', 'Plaza Regla, s/n, 24003 León', 42.599022562675496, -5.56743789804147, 'Monumento', 5, ['Espectacular', 'Muy bonita'] , ['https://www.example.com/photo2.jpg', 'https://www.example.com/photo3.jpg']);
const location3 = new Location(null, 'Playa de San Lorenzo', 'Paseo de las Palmeras, s/n, 33203 Gijón, Asturias', 43.543158258415634, -5.669035703728212, 'Playa', null, [] , ['https://www.example.com/photo4.jpg']);
const location4 = new Location('4', 'Parque del Retiro', 'Plaza de la Independencia, s/n, 28001 Madrid', 40.4152419510136, -3.686089362482189, 'Parque',4,['Muy bonito', 'Un poco masificado'] , ['https://www.example.com/photo5.jpg', 'https://www.example.com/photo6.jpg', 'https://www.example.com/photo7.jpg']);
const location5 = new Location(null, 'Puerto Viejo de Algorta', 'Puerto Viejo, 48990 Getxo, Bizkaia', 43.35296326065165, -3.013914901236413, 'Puerto', 5, ['Precioso'] , ['https://www.example.com/photo8.jpg', 'https://www.example.com/photo9.jpg']);

const locations = [location1,location2,location3,location4,location5];

const locationRoute1 = new Location(null, 'Covadonga', 'Cangas de Onís, Asturias', 43.3109, -5.0703, 'Historic Site', 4.5, ['https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Covadonga_desde_lago_Enol.jpg/640px-Covadonga_desde_lago_Enol.jpg'], ['Beautiful scenery and interesting history.']);
const locationRoute2 = new Location(null, 'Playa de San Lorenzo', 'Gijón, Asturias', 43.5429, -5.6625, 'Beach', 4.0, ['https://upload.wikimedia.org/wikipedia/commons/9/97/Gij%C3%B3n_-_Playa_de_San_Lorenzo_01.jpg'], ['Great place for a day at the beach.']);

const route=new Route(null,"Ruta1",[locationRoute1,locationRoute2]);

const routes=[route];
const categories=["Restaurante","Punto de Interes","Tienda","Edificio público","Ocio"];

//Locations

async function saveLocation(location){
    locations.push(location);
}
async function deleteLocationById(id){
    let index=getIndexOfLocation(id);
    locations.splice(index,1);

}
async function getAllLocations(){s
    return locations;
}
function getIndexOfLocation(id){
    for (const key in locations) {
        if(locations[key].id===id){
            return key;
        }
    }
}

async function getLocationById(id){
    for (const key in locations) {
        if(locations[key].id===id){
            return locations[key]
        }
    }
}

async function getCategories(){
    return categories;
}

//Friends
async function getAllFriends(){
    return friends;
}

//Routes
async function getAllRoutes(){
    return routes;
}
async function deleteRoute(routeName){
    counter=0;
    routes.forEach(route => {
        if(route.name===routeName){
            routes.splice(counter,1);
        }
        counter+=1;
    })
}

async function deleteLocationFromRouteById(routeName,locationId){
    routes.forEach(route => {
        if(route.name===routeName){
            counter=0;
            route.locations.forEach(element => {
                if(element.id===locationId){
                    route.splice(counter,1);
                }
                counter+=1;
            });
        }
    });
}


module.exports={
    saveLocation,
    getLocationById,
    deleteLocationById,
    getAllLocations,
    getCategories,
    getAllFriends,
    getAllRoutes
  };