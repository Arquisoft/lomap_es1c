Feature: Modificar location

    Scenario: Modificar location
        Given He iniciado sesion
        When abro el sidebar
        And Presiono en lugares
        And Presiono un lugar
        And Edito lugar
        Then Se ha modificado la informacion