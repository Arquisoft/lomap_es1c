Feature: Añadir y eliminar amigo

    Scenario: Añadir y eliminar amigo
        Given Estoy logeado dentro de la aplicacion con usuario 1
        When hago solicitud de amistad a usuario 2
        And Me logueo en la aplicacion con usuario 2
        And Acepto la solicitud del usuario 1
        Then usuario 1 y usuario 2 son amigos
