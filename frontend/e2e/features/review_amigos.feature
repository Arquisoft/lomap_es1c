Feature: Añadir una review en el lugar de un amigo

    Scenario: Añadir una review en el lugar de un amigo
        Given que se ha hecho login
        When me posiciono en el lugar de un amigo
        And añado una review
        Then la review se añade
