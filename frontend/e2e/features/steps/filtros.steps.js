const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const util = require('./util.js');


let page
let browser

Given('login hecho',{timeout: 20*5000}, async function () {
    //CREAR PAGINA
    [page, browser] = await util.createPage();

    //Hacer proceso de LOGIN
    await util.login(page, "solidpruebas2");
    await util.posicionarse_en_oviedo(page);
});

When('Selecciono un filtro',{timeout: 5*5000}, async function () {
  let boton = await page.waitForXPath('/html/body/div[1]/div/div[1]/div/div[3]/button[4]');
  await boton.click();

  boton = await page.waitForXPath('/html/body/div[3]/div[3]/ul/li[4]');
  await boton.click();

  for(let i=0;i<7;i++){
    await page.keyboard.press('Tab');
    await new Promise(r => setTimeout(r, 200));
  }
  await page.keyboard.press('Enter');

});

Then('se filtra correctamente', {timeout: 2*5000}, async function () {
  await new Promise(r => setTimeout(r, 3000));
  let categoria = await page.waitForXPath('/html/body/div[3]/div[3]/div/div[2]/p');
  categoria =  await categoria.evaluate(node => node.textContent);
  assert.equal("Restaurante", categoria);
  await browser.close();
});