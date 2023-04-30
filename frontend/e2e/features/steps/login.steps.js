const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const util = require('./util.js');


let page

Given('Estoy en la pagina de inicio', async function () {
    //CREAR PAGINA
    page = await util.createPage();

    // IR A LOCALHOST:3000
    await page.goto("http://localhost:3000");
  });


When('presiono el boton de login', {timeout: 2*5000} , async function () {
    // IR AL LOGIN DE INRUPT
    await page.click('.btnProvider1');
    await page.waitForNavigation();
});


When('Relleno la informacion de sesion', async function () {

    // ESCRIBIR DATOS DE INICIO DE SESION
    await page.type('#signInFormUsername', 'solidpruebas2');
    await page.type('#signInFormPassword', 'Solidpruebas1234');
  });


When('presiono botones de login de inrupt', async function () {

  // PRIMER BOTON DE LOGIN
  await page.keyboard.press('Enter');
  await page.waitForNavigation();

  // SEGUNDO BOTON DE LOGIN
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await page.waitForNavigation();
});


Then('se me redirigira a la aplicacion', function () {
  
    assert.equal(page.url().includes("http://localhost:3000/"), true);
  });