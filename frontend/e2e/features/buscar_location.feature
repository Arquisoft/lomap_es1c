Feature: Buscar Location

    Scenario: Buscar Location
        Given Estar logueado
        When hago click en el sidebar
        And Selecciono los lugares
        And Busco una localizacion por su nombre
        And Hago click en la localizacion
        Then Veo la informacion detallada de la localizacion