const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const util = require('./util.js');


let page
let browser

Given('En la pagina de inicio logeado',{timeout: 20*5000}, async function () {
    //CREAR PAGINA
    [page, browser] = await util.createPage();

    //Hacer proceso de LOGIN
    await util.login(page, "solidpruebas2");
});

When('Presiono boton de añadir ruta', async function () {
  let buton = await page.waitForXPath('/html/body/div[1]/div/div[1]/div/div[1]/button');
  await buton.hover();
  await new Promise(r => setTimeout(r, 500));

  let butonMarcador = await page.waitForXPath('/html/body/div[1]/div/div[1]/div/div[1]/div/button[1]');
  await butonMarcador.hover();
  await new Promise(r => setTimeout(r, 500));
  butonMarcador = await page.waitForXPath('/html/body/div[1]/div/div[1]/div/div[1]/div/button[2]');
  await butonMarcador.hover();
  await new Promise(r => setTimeout(r, 500));
  await butonMarcador.click();
  await new Promise(r => setTimeout(r, 1000));
});

When('Relleno datos de ruta', {timeout: 20*5000},async function () {
    //Rellena nombre
    let buton = await page.waitForXPath('/html/body/div[3]/div[3]/div/div[1]/div/input');
    await buton.type('aaruta1');
    
    //Rellena descripcion
    buton = await page.waitForXPath('/html/body/div[3]/div[3]/div/div[2]/div/input');
    await buton.type('descripcion ruta1');

    //boton add lugares a la ruta
    buton = await page.waitForXPath('/html/body/div[3]/div[3]/div/div[3]/button');
    await buton.click();

    //primera localizacion
    buton = await page.waitForXPath('/html/body/div[4]/div[3]/ul/li[1]');
    await buton.click();
    await new Promise(r => setTimeout(r, 500));
    //guardar
    buton = await page.waitForXPath('/html/body/div[3]/div[3]/div/button[2]');
    await buton.click();

    await new Promise(r => setTimeout(r, 8000));


    await page.keyboard.press('Escape');
    await page.mouse.click(500, 500);
    for(let i=0;i<3;i++){
      await page.keyboard.press('Tab');
      await new Promise(r => setTimeout(r, 200));
    }


});

Then('ruta creada',{timeout: 2*5000}, async function () {
  await util.abrir_sidebar(page);
  //Abrir rutas
  let buton = await page.waitForXPath('/html/body/div[3]/div[3]/div/div[3]/button');
  await buton.click();
  await new Promise(r => setTimeout(r, 500));

  let nombre_ruta = await page.waitForXPath('/html/body/div[3]/div[3]/div/div/div[2]/h3');
  nombre_ruta = await nombre_ruta.evaluate(node => node.textContent);
  assert.equal(nombre_ruta, 'aaruta1');

  await browser.close();
});