# Diseño de la restAPI y de el backend.



## Modelos


Location{
    
}
## Métodos de los controladores
### Locations
    - getLocations
    - getLocationById
    - saveLocation
    - deleteLocation
    - updateLocation


## WorkFlow

### Pasos iniciales

- Inicialmente el usuario se logea y tras guardar en el objeto sesion su webid como idenficador para el resto de esta procedemos a obtener sus **locations**, ya que será lo primero que se cargué al acceder al mapa.


- Casos de uso más básicos.
    - Añadimos una nueva localización.
    - Modificamos una localización existente.
    - Borramos una localización existente.
    - Buscamos de nuevo todas las localizaciones.

Estos casos serían fáciles de resolver:

FrontEnd -> RestApi -> Backend -> Solid -> PodBrowser -> Solid -> Parse -> Backend -> Serialize -> RestApi -> FrontEnd


### 


## Dudas

¿Deberíamos permitir multisesión? Es decir, debería poder conectarme desde el móvil y desde el pórtatil y que ambas sesiones estuviesen actualizadas?.


¿Es el uso de Redis como cache útil en este escenario? Es interesante considerar la opción pero estoy bastante seguro de que la respuesta es no dado el bajo tráfico que tendremos en la aplicación.

¿Deberíamos utilizar rabbitMQ (por ejemplo) para mantener todas las sesiones actualizadas, aunque haya multisesión? Es esto demasiado solo para las **locations** y las **reviews**, que además sólo se darían en el caso de la multisesión. También serviría para actualizar las **reviews** en caso de que un amigo tuyo escribiese una **review** mientras tu estás en sesión.

Esto implicaría el uso de WebSockets en el FrontEnd, lo que añadiría mucha complejidad.