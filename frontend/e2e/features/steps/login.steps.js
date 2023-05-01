const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const util = require('./util.js');


let page
let browser

Given('Estoy en la pagina de inicio', async function () {
    //CREAR PAGINA
    [page, browser] = await util.createPage();

    // IR A LOCALHOST:3000
    await page.goto("http://localhost:3000");
  });


When('presiono el boton de login', {timeout: 2*5000} , async function () {
    // IR AL LOGIN DE INRUPT
    let botonLogin = await page.waitForXPath('/html/body/div/div/div[2]/div/div/div/button');
    await botonLogin.click();
    await page.waitForNavigation();
});


When('Relleno la informacion de sesion', async function () {

    // ESCRIBIR DATOS DE INICIO DE SESION
    let botonUsername = await page.waitForXPath('/html/body/div[1]/div/div[1]/div[2]/div[2]/div[3]/div/div/form/div[1]/input');
    await botonUsername.type('solidpruebas2');
    botonUsername = await page.waitForXPath('/html/body/div[1]/div/div[1]/div[2]/div[2]/div[3]/div/div/form/div[2]/input');
    await botonUsername.type('Solidpruebas1234');
  });


When('presiono botones de login de inrupt',{timeout: 3*5000} , async function () {

  // PRIMER BOTON DE LOGIN
  await page.keyboard.press('Enter');
  await page.waitForNavigation();

  // SEGUNDO BOTON DE LOGIN
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await page.waitForNavigation();
});


Then('se me redirigira a la aplicacion', async function () {
  
    assert.equal(page.url().includes("http://localhost:3000/"), true);
    await browser.close();
  });