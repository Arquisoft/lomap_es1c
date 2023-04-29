const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const util = require('./util.js');


let page

Given('Estoy logeado dentro de la aplicacion', {timeout: 20*5000}, async function () {
  return 'pending';
    //CREAR PAGINA
    page = await util.createPage();

    //Hacer proceso de LOGIN
    await util.login(page);
});

When('Presiono boton de añadir marcador', {timeout: 2*5000}, async function () {
    let buton = await page.waitForXPath('/html/body/div[1]/div/div[1]/div/div[1]/button');
    await buton.hover();

    let butonMarcador = await page.waitForXPath('/html/body/div[1]/div/div[1]/div/div[1]/div/button[1]');
    await butonMarcador.hover();
    await butonMarcador.click();
    await new Promise(r => setTimeout(r, 1000));
});


When('Selecciono un punto del mapa', {timeout: 3*5000},async function () {
  await page.mouse.click(500, 500);
  await new Promise(r => setTimeout(r, 3000));
});

When('Relleno datos de la localizacion', {timeout: 10*5000 }, async function () {
    //Nombre
    let buton = await page.waitForXPath('/html/body/div[3]/div/div/form/div[1]/div/input');
    await buton.type('prueba aceptacion');
  
    //Estrellas
    buton = await page.waitForXPath('/html/body/div[3]/div/div/form/span/span[4]/label[2]');
    await buton.click();
  
    //Categoria
    buton = await page.waitForXPath('/html/body/div[3]/div/div/form/div[2]/div');
    await buton.click();
  
    buton = await page.waitForXPath('/html/body/div[5]/div[3]/ul/li[3]');
    await buton.click();
  
    //Comentario
    buton = await page.waitForXPath('/html/body/div[3]/div/div/form/div[3]/div/textarea[1]');
    await buton.type('comentario prueba aceptacion');
  
    //Guardar
    buton = await page.waitForXPath('/html/body/div[3]/div/div/div/button[1]');
    await buton.type('comentario prueba aceptacion');
  
    await new Promise(r => setTimeout(r, 6000));
});


Then('Se añade el punto al mapa', {timeout: 3*5000}, async function () {
  await util.abrir_sidebar(page);
  await util.abrir_lugares(page);
  await util.buscar_location(page, "prueba aceptacion");
  assert.equal(((await util.obtener_nombre_lugar(page)) + "").includes("prueba"), true);

  //Eliminar la localizacion
  await util.pulsar_lugar(page);
  await util.borrar_location(page);

});