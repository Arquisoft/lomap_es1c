import Route from "../models/Route";
import Location from "../models/locationModels/Location";
import Friend from "../models/Friend";
import Photo from "../models/locationModels/Photo";
import Comment from "../models/locationModels/Comment";
import review from "../models/locationModels/Review";

const friends = [
	new Friend(null, "https://example.com/alice"),
	new Friend(null, "https://example.com/luis"),
	new Friend("Jorge", "https://example.com/jorge"),
	new Friend(null, "https://example.com/jaime"),
	new Friend("David", "https://example.com/david"),
];

const location1 = new Location(
	"Eiffel Tower",
	48.8584,
	2.2945,
	"A wrought-iron lattice tower on the Champ de Mars in Paris, France",
	"Jane Smith",
	"Punto de Interes"
);
const location2 = new Location(
	"Golden Gate Bridge",
	37.8199,
	-122.4783,
	"A suspension bridge spanning the Golden Gate strait in San Francisco, California",
	"Bob Johnson",
	"Punto de Interes"
);
const location3 = new Location(
	"Central Park",
	40.7829,
	-73.9654,
	"A large public park in New York City",
	"John Doe",
	"Tienda"
);
const location4 = new Location(
	"Grand Canyon",
	36.1069,
	-112.1126,
	"A steep-sided canyon carved by the Colorado River in Arizona, United States",
	"Sarah Lee",
	"Restaurante"
);
const location5 = new Location(
	"Sydney Opera House",
	-33.8568,
	151.2153,
	"A multi-venue performing arts center in Sydney, Australia",
	"David Lee",
	"Ocio"
);
const location6 = new Location(
	"Machu Picchu",
	-13.1631,
	-72.545,
	"An ancient Inca city in the Andes Mountains of Peru",
	"Maria Garcia",
	"Tienda"
);
const location7 = new Location(
	"Taj Mahal",
	27.175,
	78.0422,
	"A white marble mausoleum in Agra, India, built by Mughal emperor Shah Jahan in memory of his wife Mumtaz Mahal",
	"Rahul Singh",
	"Punto de Interes"
);

const locations = [location1, location2, location3, location4, location5];

const route = new Route("Ruta1", "Ruta de prueba", "Miguel");
route.addLocation(location6);
route.addLocation(location7);

const routes = [route];

const categories = [
	"Restaurante",
	"Punto de Interes",
	"Tienda",
	"Edificio público",
	"Ocio",
];

//Locations

async function saveLocation(location) {
	locations.push(location);
}
async function deleteLocationById(id) {
	let index = getIndexOfLocation(id);
	locations.splice(index, 1);
}

async function getAllLocations(){
    return locations;
}

function getIndexOfLocation(id) {
	for (const key in locations) {
		if (locations[key].id === id) {
			return key;
		}
	}
}

async function getLocationById(id) {
	for (const key in locations) {
		if (locations[key].id === id) {
			return locations[key];
		}
	}
}

async function getCategories() {
	return categories;
}

//Friends
async function getAllFriends() {
	return friends;
}

//Routes
async function getAllRoutes() {
	return routes;
}
async function deleteRoute(routeName) {
	counter = 0;
	routes.forEach((route) => {
		if (route.name === routeName) {
			routes.splice(counter, 1);
		}
		counter += 1;
	});
}

async function deleteLocationFromRouteById(routeName, locationId) {
	routes.forEach((route) => {
		if (route.name === routeName) {
			counter = 0;
			route.locations.forEach((element) => {
				if (element.id === locationId) {
					route.splice(counter, 1);
				}
				counter += 1;
			});
		}
	});
}

export {
	saveLocation,
	getLocationById,
	deleteLocationById,
	getAllLocations,
	getCategories,
	getAllFriends,
	getAllRoutes,
};
