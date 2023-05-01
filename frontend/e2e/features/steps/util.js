const puppeteer = require('puppeteer');


async function createPage(){
        let browser = await puppeteer.launch(
          // {
          //   headless: false,
          //   args: ['--start-maximized'] 
          // }
        );
    let page = await browser.newPage();
    return [page, browser];
  }


async function login(page, usuario){

    // IR A LOCALHOST:3000
    await page.goto("http://localhost:3000");

    // IR AL LOGIN DE INRUPT
    let botonLogin = await page.waitForXPath('/html/body/div/div/div[2]/div/div/div/button');
    await botonLogin.click();
    await page.waitForNavigation();

    // ESCRIBIR DATOS DE INICIO DE SESION
    let botonUsername = await page.waitForXPath('/html/body/div[1]/div/div[1]/div[2]/div[2]/div[3]/div/div/form/div[1]/input');
    await botonUsername.type(usuario);
    botonUsername = await page.waitForXPath('/html/body/div[1]/div/div[1]/div[2]/div[2]/div[3]/div/div/form/div[2]/input');
    await botonUsername.type('Solidpruebas1234');

    // PRIMER BOTON DE LOGIN
    await page.keyboard.press('Enter');
    await page.waitForNavigation();

    // SEGUNDO BOTON DE LOGIN
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForNavigation();

    await new Promise(r => setTimeout(r, 16000));

    //Quitar Mensaje
    for(let i=0;i<12;i++){
      await page.keyboard.press('Tab');
      await new Promise(r => setTimeout(r, 100));
    }
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await page.keyboard.up('Shift');
    await page.keyboard.press('Enter');



}


async function posicionarse_en_oviedo(page){
      // POSICIONARSE EN OVIEDO
    await abrir_sidebar(page);
    await abrir_lugares(page);
    await buscar_location(page, "San Francisco");
    await pulsar_lugar(page);

    await new Promise(r => setTimeout(r, 1000));
    await ir_a_lugar(page);
    await page.keyboard.press('Escape');
    await page.mouse.click(500, 500);

    await new Promise(r => setTimeout(r, 2000));
}



async function ir_a_lugar(page){
  let buton_sidebar = await page.waitForXPath('/html/body/div[3]/div[3]/div/button[2]');
  await buton_sidebar.click();
}

async function abrir_sidebar(page){
  let buton_sidebar = await page.waitForXPath('/html/body/div[1]/div/div[3]/button');
  await buton_sidebar.click();
  await new Promise(r => setTimeout(r, 500));
}

async function abrir_lugares(page){
  let buton_lugares = await page.waitForXPath('/html/body/div[3]/div[3]/div/div[1]/button');
  await buton_lugares.click();
  await new Promise(r => setTimeout(r, 500));
}

async function abrir_amigos(page){
  let buton = await page.waitForXPath('/html/body/div[3]/div[3]/div/div[2]/button');
  await buton.click();
  await new Promise(r => setTimeout(r, 500));
}


async function pulsar_lugar(page){
  let buton_lugar = await page.waitForXPath('/html/body/div[3]/div[3]/div/div/div[2]');
  await buton_lugar.click();
  await new Promise(r => setTimeout(r, 2000));
}

async function pulsar_amigo(page){
  let buton = await page.waitForXPath('/html/body/div[3]/div[3]/div/div/div[2]');
  await buton.click();
  await new Promise(r => setTimeout(r, 2000));
}



async function editar_lugar(page){
  //CLICK EN EDITAR
  let buton = await page.waitForXPath('/html/body/div[3]/div[3]/div/div[3]/button[1]');
  await buton.click();
  await new Promise(r => setTimeout(r, 500));

  //CAMBIAR NOMBRE
  let random_number = Math.floor(Math.random() * 10000000000);
  buton = await page.waitForXPath('/html/body/div[3]/div[3]/div/div[1]/div/input');
  await buton.click({ clickCount: 3 });
  await buton.type('Random: ' + random_number);
  await new Promise(r => setTimeout(r, 500));

  //CLICK EN GUARDAR
  buton = await page.waitForXPath('/html/body/div[3]/div[3]/div/button[2]');
  await buton.click();
  await new Promise(r => setTimeout(r, 8000));

}


async function borrar_location(page){
  let buton_sidebar = await page.waitForXPath('/html/body/div[3]/div[3]/div/div[3]/button[2]');
  await buton_sidebar.click();
  await new Promise(r => setTimeout(r, 3000));
}

async function obtener_nombre_lugar(page){
  let buton_lugar = await page.waitForXPath('/html/body/div[3]/div[3]/div/div/div[2]/div/h3');
  return await buton_lugar.evaluate(node => node.textContent);
}

async function buscar_location(page, nombre){
  let buton_lugar = await page.waitForXPath('/html/body/div[3]/div[3]/div/div/div[1]/div/div/input');
  return await buton_lugar.type(nombre);
}

async function obtener_comentario(page){
  let buton_lugar = await page.waitForXPath('/html/body/div[3]/div[3]/div/div[4]/div/p[2]');
  return await buton_lugar.evaluate(node => node.textContent);
}


async function posicionarse_lugar_amigo(page){
  await abrir_sidebar(page);
  await abrir_amigos(page);
  await pulsar_amigo(page);
  let buton = await page.waitForXPath('/html/body/div[3]/div[3]/div/div');
  await buton.click();
  await new Promise(r => setTimeout(r, 3000));
}



module.exports = {createPage, login, abrir_sidebar, abrir_lugares, pulsar_lugar, editar_lugar, obtener_nombre_lugar, buscar_location, obtener_comentario, ir_a_lugar, borrar_location, posicionarse_en_oviedo, abrir_amigos, pulsar_amigo, posicionarse_lugar_amigo};