const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const util = require('./util.js');


let page
let browser



Given('que se ha hecho login',{timeout: 20*5000}, async function () {
    //CREAR PAGINA
    [page, browser] = await util.createPage();

    //Hacer proceso de LOGIN
    await util.login(page, "solidpruebas2");
});


When('me posiciono en el lugar de un amigo',{timeout: 3*5000}, async function () {
  await util.posicionarse_lugar_amigo(page);
});



When('añado una review',{timeout: 4*5000}, async function () {
  //Pulso en añadir reseña
  let buton = await page.waitForXPath('/html/body/div[3]/div[3]/div/div[5]/button');
  await buton.click();

  //Relleno datos
    //dar estrellas
    buton = await page.waitForXPath('/html/body/div[3]/div[3]/div/div[5]/div[1]/span/span[3]/label[2]/span[1]');
    await buton.click();
    //comentario
    buton = await page.waitForXPath('/html/body/div[3]/div[3]/div/div[5]/div[1]/div[1]/div/input');
    await buton.type('3 estrellas');
    //guardar
    buton = await page.waitForXPath('/html/body/div[3]/div[3]/div/div[5]/div[1]/div[2]/button[1]');
    await buton.click();
    await new Promise(r => setTimeout(r, 4000));

    await page.keyboard.press('Escape');
    await page.mouse.click(500, 500);
    for(let i=0;i<3;i++){
      await page.keyboard.press('Tab');
      await new Promise(r => setTimeout(r, 200));
    }
});




Then('la review se añade', {timeout: 4*5000}, async function () {
  await util.posicionarse_lugar_amigo(page);
  let nombre_comment = await page.waitForXPath('/html/body/div[3]/div[3]/div/div[5]/div[1]/p');
  nombre_comment = await nombre_comment.evaluate(node => node.textContent);
  assert.equal("3 estrellas", nombre_comment.trim());

  //Eliminamos review
  buton = await page.waitForXPath('/html/body/div[3]/div[3]/div/div[5]/button[2]');
  await buton.click();

  await new Promise(r => setTimeout(r, 4000));
  await browser.close();
});




