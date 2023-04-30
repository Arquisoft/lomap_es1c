const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const util = require('./util.js');


let page
let nombre_lugar

Given('He iniciado sesion', {timeout: 20*5000}, async function () {
    //CREAR PAGINA
    page = await util.createPage();

    // IR A LOCALHOST:3000
    await util.login(page, "solidpruebas2");
});

When('abro el sidebar', async function () {

    //Abrir SIDEBAR
    await util.abrir_sidebar(page);
});

When('Presiono en lugares', async function () {
    await util.abrir_lugares(page);
});

When('Presiono un lugar', async function () {
    await util.buscar_location(page, "Random");
    nombre_lugar = await util.obtener_nombre_lugar(page);
     await util.pulsar_lugar(page);
});

When('Edito lugar', {timeout: 5*5000}, async function () {
    await util.editar_lugar(page);
});

Then('Se ha modificado la informacion', async function () {
  // Write code here that turns the phrase above into concrete actions
  await util.abrir_lugares(page);
  await util.buscar_location(page, "Random");
  assert.notEqual(await util.obtener_nombre_lugar(page), nombre_lugar);
});