Feature: Iniciar Sesion en Inrupt

    Scenario: Iniciar Sesion
        Given Estoy en la pagina de inicio
        When presiono el boton de login
        And Relleno la informacion de sesion
        And presiono botones de login de inrupt
        Then se me redirigira a la aplicacion
