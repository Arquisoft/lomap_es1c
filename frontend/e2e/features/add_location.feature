Feature: Añadir localizacion

    Scenario: Añadir una localizacion
        Given Estoy logeado dentro de la aplicacion
        When Presiono boton de añadir marcador
        And Selecciono un punto del mapa
        And Relleno datos de la localizacion
        Then Se añade el punto al mapa
