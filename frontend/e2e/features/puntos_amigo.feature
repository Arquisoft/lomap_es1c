Feature: Ver las localizaciones de un amigo

    Scenario: Ver las localizaciones de un amigo
        Given login hecho en la aplicacion
        When presiono en abrir el sidebar
        And presiono en amigos
        And presiono en un amigo
        Then puedo ver sus puntos
