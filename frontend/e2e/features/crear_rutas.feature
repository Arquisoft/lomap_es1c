Feature: Crear rutas

    Scenario: Crear rutas
        Given En la pagina de inicio logeado
        When Presiono boton de añadir ruta
        And Relleno datos de ruta
        Then ruta creada
