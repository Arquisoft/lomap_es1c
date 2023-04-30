const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const util = require('./util.js');


let page
let browser
Given('login hecho en la aplicacion', {timeout: 20*5000},async function () {
    //CREAR PAGINA
    [page, browser] = await util.createPage();

    //Hacer proceso de LOGIN
    await util.login(page, "solidpruebas2");
});



When('presiono en abrir el sidebar', async function () {
  await util.abrir_sidebar(page);
});


When('presiono en amigos', async function () {
  await util.abrir_amigos(page);
});



When('presiono en un amigo',{timeout: 4*5000}, async function () {
  await util.pulsar_amigo(page);
});




Then('puedo ver sus puntos', async function () {
  let buton = await page.waitForXPath('/html/body/div[3]/div[3]/div/div/div/h3');
  buton = await buton.evaluate(node => node.textContent);
  assert.equal("lugar1", buton.trim());
  await browser.close();

});











