const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const util = require('./util.js');


let page
let browser

Given('Estar logueado', {timeout: 10*5000}, async function () {
  //CREAR PAGINA
  [page, browser] = await util.createPage();

  // IR A LOCALHOST:3000
  await util.login(page, "solidpruebas2");

  });


When('hago click en el sidebar', async function () {
  await util.abrir_sidebar(page);
});

When('Selecciono los lugares', async function () {
  await util.abrir_lugares(page);
});

When('Busco una localizacion por su nombre', async function () {
  await util.buscar_location(page, "San Francisco");
});

When('Hago click en la localizacion', {timeout: 2*5000},async function () {
  await util.pulsar_lugar(page);
});


Then('Veo la informacion detallada de la localizacion', async function () {
  assert.equal(await util.obtener_comentario(page), "Muy Bonito");
  await browser.close();
});
