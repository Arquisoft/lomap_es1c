//Importamos los objetos del Modelo
const Location = require('../models/Location');
const { Review } = require('../models/Review');
const { post } = require('../routes/userSessionRouter');
const {auth} =require('../controllers/AuthController');
//Utilizamos nuestra clase solid para parsear.
const solid = require('../solid/Solid.js');

//localizaciones hardcodeadas

const location1 = new Location('1', 'Parque San Francisco', 'El Palomar', 43.361444061368786, -5.850460182754155, 'Parque', [{ rating: 4, comment: 'Lugar muy bonito' }], ['https://www.example.com/photo1.jpg']);
const location2 = new Location('2', 'Catedral de León', 'Plaza Regla, s/n, 24003 León', 42.599022562675496, -5.56743789804147, 'Monumento', [{ rating: 5, comment: 'Espectacular' }, { rating: 4, comment: 'Muy bonita' }], ['https://www.example.com/photo2.jpg', 'https://www.example.com/photo3.jpg']);
const location3 = new Location(null, 'Playa de San Lorenzo', 'Paseo de las Palmeras, s/n, 33203 Gijón, Asturias', 43.543158258415634, -5.669035703728212, 'Playa', [], ['https://www.example.com/photo4.jpg']);
const location4 = new Location('4', 'Parque del Retiro', 'Plaza de la Independencia, s/n, 28001 Madrid', 40.4152419510136, -3.686089362482189, 'Parque', [{ rating: 4, comment: 'Muy bonito' }, { rating: 3, comment: 'Un poco masificado' }], ['https://www.example.com/photo5.jpg', 'https://www.example.com/photo6.jpg', 'https://www.example.com/photo7.jpg']);
const location5 = new Location(null, 'Puerto Viejo de Algorta', 'Puerto Viejo, 48990 Getxo, Bizkaia', 43.35296326065165, -3.013914901236413, 'Puerto', [{ rating: 5, comment: 'Precioso' }], ['https://www.example.com/photo8.jpg', 'https://www.example.com/photo9.jpg']);

const locations=[location1,location2,location3,location4,location5];

  async function getLocation(req, res) {
    const { url } = req.params;

    try {
      const location = await Solid.getLocationById(url);
      res.send(JSON.stringify(location));
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
  //TODO
  async function getAllLocations(req, res) {
    try {
      //console.log("hola")
      //await onsole.log(auth.test);
      //console.log("adios")
      //console.log(auth.getSession(req.session.sessionId));
      console.log(req.session.user);
      console.log(req.session.sessionId);
      //const locations = await Solid.getAllLocations();
      res.send(JSON.stringify(locations));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


 async function createLocation(req, res) {
    const { name, address, latitude, longitude, category } = req.body;
    try {
      const location = new Location(name, address, latitude, longitude, category);
      await Solid.saveLocation(location);
      res.status(201).json(location);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async function updateLocation(req, res) {
    const {id }=req.params;
    const { name, address, latitude, longitude, category } = req.body;

    try {
      const location = await Solid.getLocationById(id);
      //Toma el valor nuevo si no es null.
      if (name) location.name = name;
      if (address) location.address = address;
      if (latitude) location.latitude = latitude;
      if (longitude) location.longitude = longitude;
      if (category) location.category = category;
      //Luego vuelve a guardarlo
      await Solid.saveLocation(location);
      res.json(location);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

 async function deleteLocation(req, res) {
    const { id } = req.params;

    try {
      await Solid.deleteLocationById(id);
      res.sendStatus(204);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async function addReview(req, res) {
    const { id } = req.params;
    const { rating, text, author } = req.body;

    try {
      const location = await Solid.getLocationById(id);
      const review = new Review(rating, text, author);

      location.addReview(review);
      await Solid.saveLocation(location);

      res.status(201).json(review);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async function addPhoto(req, res) {
    const { id } = req.params;
    const { photoUrl } = req.body;

    try {
      const location = await Solid.getLocationById(id);
      location.addPhoto(photoUrl);
      await Solid.saveLocation(location);

      res.status(201).json({ message: 'Photo added successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  module.exports={
    createLocation,getAllLocations,getLocation,deleteLocation,updateLocation,addReview,addPhoto
  };