const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const util = require('./util.js');


let page



Given('Estoy logeado dentro de la aplicacion con usuario 1', {timeout: 20*5000}, async function () {
    //CREAR PAGINA
    page = await util.createPage();

    //Hacer proceso de LOGIN
    await util.login(page, "solidpruebas3");
});




When('hago solicitud de amistad a usuario 2', {timeout: 2*5000}, async function () {
    await util.abrir_sidebar(page);
    await util.abrir_amigos(page);
    let boton = await page.waitForXPath('/html/body/div[3]/div[3]/div/div/div[1]/button[2]');
    await boton.click();
    await new Promise(r => setTimeout(r, 500));

    //Relleno datos
    boton = await page.waitForXPath('/html/body/div[3]/div[3]/div/div[1]/div/input');
    await boton.type('solidpruebas4');

    boton = await page.waitForXPath('/html/body/div[3]/div[3]/div/div[2]/div/input');
    await boton.type('https://id.inrupt.com/solidpruebas4');

    boton = await page.waitForXPath('/html/body/div[3]/div[3]/div/button[2]');
    await boton.click();


});



When('Me logueo en la aplicacion con usuario 2', {timeout: 20*5000}, async function () {
    page = await util.createPage();

    //Hacer proceso de LOGIN
    await util.login(page, "solidpruebas4");
});


When('Acepto la solicitud del usuario 1', {timeout: 3*5000},async function () {
    await util.abrir_sidebar(page);
    await util.abrir_amigos(page);

    let boton = await page.waitForXPath('/html/body/div[3]/div[3]/div/div/div/button[1]');
    await boton.click();
    await new Promise(r => setTimeout(r, 500));

    boton = await page.waitForXPath('/html/body/div[3]/div[3]/div/div/div/button[1]');
    await boton.click();


    boton = await page.waitForXPath('/html/body/div[3]/div[3]/div/div[1]/div/input');
    await boton.type('solidpruebas3');

    boton = await page.waitForXPath('/html/body/div[3]/div[3]/div/button[2]');
    await boton.click();
});


Then('usuario 1 y usuario 2 son amigos', {timeout: 20*5000},async function () {
    page = await util.createPage();

    //Hacer proceso de LOGIN
    await util.login(page, "solidpruebas4");

    await util.abrir_sidebar(page);
    await util.abrir_amigos(page);

    let name_friend = await page.waitForXPath('/html/body/div[3]/div[3]/div/div/div[2]/div/p');
    name_friend = await name_friend.evaluate(node => node.textContent);

    assert.equal("solidpruebas3", name_friend.trim());

    await util.pulsar_amigo(page);

    let boton = await page.waitForXPath('/html/body/div[3]/div[3]/div/button[2]');
    await boton.click();



});