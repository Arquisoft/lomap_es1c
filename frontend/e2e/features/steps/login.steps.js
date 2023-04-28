const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');


let page

// Inicializacion de la pagina
async function createPage(){
  let browser = await puppeteer.launch();
  page = await browser.newPage();
}



Given('Estoy en la pagina de inicio', async function () {
    await createPage();
    // IR A LOCALHOST:3000
    await page.goto("http://localhost:3000");
    await page.screenshot({path: './screenshot_Puppeteer/foto_home_inicio.jpg'});
  });


When('presiono el boton de login', {timeout: 2*5000} , async function () {
    // IR AL LOGIN DE INRUPT
    await page.click('.btnProvider1');
    await page.waitForNavigation();
    await page.screenshot({path: './screenshot_Puppeteer/foto_inrupt_llegada.jpg'});
});


When('Relleno la informacion de sesion', async function () {

    // ESCRIBIR DATOS DE INICIO DE SESION
    await page.type('#signInFormUsername', 'solidpruebas2');
    await page.type('#signInFormPassword', 'Solidpruebas1234');
    await page.screenshot({path: './screenshot_Puppeteer/foto_inrupt_escritura.jpg'});
  });


When('presiono botones de login de inrupt', async function () {

  // PRIMER BOTON DE LOGIN
  await page.keyboard.press('Enter');
  await page.waitForNavigation();
  await page.screenshot({path: './screenshot_Puppeteer/foto_inrupt_press_login.jpg'});

  // SEGUNDO BOTON DE LOGIN
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await page.waitForNavigation();
  await page.screenshot({path: './screenshot_Puppeteer/foto_home_redirect.jpg'});
});


Then('se me redirigira a la aplicacion', function () {
  
    assert.equal(page.url().includes("http://localhost:3000/"), true);
  });