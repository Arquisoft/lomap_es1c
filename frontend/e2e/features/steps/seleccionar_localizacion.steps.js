const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const util = require('./util.js');


let page
let browser

Given('Estoy logeado en la aplicacion', {timeout: 20*5000}, async function () {
    //CREAR PAGINA
    [page, browser] = await util.createPage();

    //Hacer proceso de LOGIN
    await util.login(page, "solidpruebas2");
    await util.posicionarse_en_oviedo(page);
});

When('Presiono localizacion', {timeout: 3*5000}, async function () {
  for(let i=0;i<4;i++){
    await page.keyboard.press('Tab');
    await new Promise(r => setTimeout(r, 200));
  }
  await page.keyboard.press('Enter');
  await new Promise(r => setTimeout(r, 4000));
});


Then('puedo ver la informacion de la localizacion', async function () {
  // Write code here that turns the phrase above into concrete actions    
  assert.equal(await util.obtener_comentario(page), "Muy Bonito");
  await browser.close();
});