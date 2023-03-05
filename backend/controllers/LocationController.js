//Importamos los objetos del Modelo
const { Location } = require('../models/Location');
const { Review } = require('../models/Review');
//Utilizamos nuestra clase solid para parsear.
const solid = require('../solid/Solid.js');





class LocationController {
  static async createLocation(req, res) {
    const { name, address, latitude, longitude, category } = req.body;

    try {
      const location = new Location(name, address, latitude, longitude, category);
      await Solid.saveLocation(location);
      res.status(201).json(location);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getLocation(req, res) {
    const { id } = req.params;

    try {
      const location = await Solid.getLocationById(id);
      res.json(location);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  static async getAllLocations(req, res) {
    try {
        let locations = [
            {
              nombre: 'Mi casa',
              latitud: 12,
              longitud: -10,
              fotos: [],
              comentarios: [],
              puntuacion: 3
            },
            {
                nombre: 'Tu casa',
                latitud: 12,
                longitud: -10,
                fotos: [],
                comentarios: [],
                puntuacion: 3
            },
            {
                nombre: 'Su casa',
                latitud: 12,
                longitud: -10,
                fotos: [],
                comentarios: [],
                puntuacion: 3
            }
          ];
      //const locations = await Solid.getAllLocations();
      res.send(locations);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateLocation(req, res) {
    const { id } = req.params;
    const { name, address, latitude, longitude, category } = req.body;

    try {
      const location = await Solid.getLocationById(id);

      if (name) location.name = name;
      if (address) location.address = address;
      if (latitude) location.latitude = latitude;
      if (longitude) location.longitude = longitude;
      if (category) location.category = category;

      await Solid.saveLocation(location);
      res.json(location);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  static async deleteLocation(req, res) {
    const { id } = req.params;

    try {
      await Solid.deleteLocationById(id);
      res.sendStatus(204);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  static async addReview(req, res) {
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

  static async addPhoto(req, res) {
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
}

module.exports = { LocationController };