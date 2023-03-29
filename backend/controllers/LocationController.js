const { getSessionFromStorage} = require('@inrupt/solid-client-authn-node');

const Location = require('../models/Location');
const solid = require('../solid/SolidPrueba.js');

  async function getLocation(req, res) {
    const { id } = req.params;
    try {
 
      let session=await getSessionFromStorage(req.session.sessionId);
      const location1 = await solid.getLocationById(id);
      if(location1!=null){
        res.send(JSON.stringify(location1));
      }else{
        res.send("No se encontraron localizaciones con esa id");
      }
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }


  async function getAllLocations(req, res) {
    try {
      session=await getSessionFromStorage(req.session.sessionId);
      const locations=await solid.getAllLocations(session);
      res.send(JSON.stringify(locations));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

 async function createLocation(req, res) {
    const { name, address, latitude, longitude, category } = req.body;
    try {
      session=await getSessionFromStorage(req.session.sessionId);
      const location = new Location(null,name, address, latitude, longitude, category);
      await solid.saveLocation(location);
      res.status(201).json(location);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async function updateLocation(req, res) {
    const {id }=req.params;
    const { name, address, latitude, longitude, category } = req.body;

    try {
      const location = await solid.getLocationById(id);
      //Toma el valor nuevo si no es null.
      if (name) location.name = name;
      if (address) location.address = address;
      if (latitude) location.latitude = latitude;
      if (longitude) location.longitude = longitude;
      if (category) location.category = category;
      //Luego vuelve a guardarlo
      await solid.saveLocation(location);
      res.json(location);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
  
  async function deleteLocation(req, res) {
    const { id } = req.params;
    try {
      await solid.deleteLocationById(id);
      res.sendStatus(204);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async function setRating(req,res){
    const { id } = req.params;
    const { rating } = req.body;

    try {
      const location = await Solid.getLocationById(id);
      location.setRating(rating);
      await solid.saveLocation(location);

      res.status(201).json({ message: 'Rating changed successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }


  async function addPhoto(req, res) {
    const { id } = req.params;
    const { photoUrl } = req.body;

    try {
      const location = await solid.getLocationById(id);
      location.addPhoto(photoUrl);
      await solid.saveLocation(location);

      res.status(201).json({ message: 'Photo added successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  async function addComment(req, res) {
    const { id } = req.params;
    const { comment } = req.body;

    try {

      const location = await solid.getLocationById(id);
      location.addComment(comment);
      await solid.saveLocation(location);

      res.status(201).json({ message: 'Comment added successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async function getCategories(req,res){

    try{
      let categories=await solid.getCategories();
      res.send(JSON.stringify(categories));
    }catch (err){
      res.status(400).json("Ha habido un problema devolviendo las categorias");
    }
  }

    /*
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
  */

  module.exports={
    createLocation,getAllLocations,getLocation,deleteLocation,updateLocation,addPhoto,getCategories,setRating,addComment
  };