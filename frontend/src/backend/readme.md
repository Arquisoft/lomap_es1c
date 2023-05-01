# Conceptos básicos
La carpeta backend consta de los modelos, los controladores a los que se accede a través del frontal y de la carpeta "solid", que hace a su vez de servicio, recuperando
o añadiendo los modelos, tratando con ellos por medio de parsers o serializers, y realizando así toda la comunicación con los PODs.
## Controladores
### Friend 
    El friendController es el encargado de añadir, borrar y devolver tanto los amigos, como las solicitudes de amistad.
    - getAllFriends
    - addFriend
    - deleteFriend
    - getFriendLocations
    - getFriendLocationById
    - sendFriendRequest
    - getAllRequests
    - acceptRequest
    - rejectRequest
### Route
    El routeController es el encargado de trabajar con las rutas, contiene los métodos CRUD para las rutas, y los métodos para trabajar con las localizaciones de esas rutas.
    - getAllRoutes
    - getRouteById
    - addRoute
    - updateRoute
    - deleteRoute
    - addLocationToRoute
    - deleteLocationFromRoute
### Locations
    El locationController contiene los metodos CRUD para las localizaciones, y los métodos para trabajar con las reviews y las fotos que se guardan en esa localización.
    - getAllLocations
    - getLocation
    - createLocation (saveLocation)
    - deleteLocation
    - updateLocation
    - addReview
    - deleteReview
    - addPhoto
    - deletePhoto
    - getCategories
### Route
    - createStruct
## Modelos

Route->
    id: String
    name: String
    description: String
    author: String 
    locations: List (Location)

Location->
    id: String
    name: String
    latitude: Float
    longitude: Float
    category: String
    author: String
    timestamp: Int
    photos: List (Photo)
    reviews: List (Review)

Review->
    id: String
    rating: Int
    comment: String
    author: String

Photo->
    id: String
    name: String
    imageJpg: String (the data field)
    timestamp: Int
    author: String 

Friend ->
    name: String
    webId: String
    id: String

FriendRequest ->
    sender: String
    receiver: String
    id: String 
    timestamp: Int
