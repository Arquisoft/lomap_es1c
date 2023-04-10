# Diseño de la restAPI y de el backend.





## Métodos de los controladores

### Auth
    - login
    - logout
    - isLoggedIn
### Friend
    - getAllFriends
    - addFriend
    - deleteFriend
    - getAllLocationsFromFriends
    - getFriendLocations
    - getAllLocationsByCategory
### Route
    - getAllRoutes
    - getRouteById
    - addRoute
    - updateRoute
    - deleteRoute
    - addLocationToRoute
    - deleteLocationFromRoute
    - changeOrderOfLocationInRoute
### Locations
    - getLocations
    - getLocationById
    - createLocation (saveLocation)
    - deleteLocation
    - updateLocation
    - getCategories
    - getLocationsByCategory
    - addReview
    - deleteReview
    - addComment
    - deleteComment
    - addPhoto
    - deletePhoto

## Modelos

Routes->
    id: String
    name: String
    description: String
    author: String 

Location->
    id: String
    name: String
    latitude: Float
    longitude: Float
    category: String
    privacy: String
    author: String
    timestamp: Int

Review->
    id: String
    rating: Int
    author: String


Photo->
    id: String
    name: String
    url: String
    timestamp: Int
    author: String 

Comment->
    id: String
    text: String
    timestamp: Int
    author: String 
