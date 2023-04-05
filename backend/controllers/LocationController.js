const { getSessionFromStorage } = require("@inrupt/solid-client-authn-node");

const Location = require("../models/locationModels/Location");
const Photo = require("../models/locationModels/Photo");
const Review = require("../models/locationModels/Review");
const Comment = require("../models/locationModels/Comment");
const SessionController = require("./util/sessionController");
const solid = require("../solid/Solid.js");

//CRUD

async function getLocation(req, res) {
	const { id } = req.params;
	try {
		const session = SessionController.getSession(req, next);
		const location1 = await solid.getLocationById(
			session,
			id,
			req.session.user
		);
		if (location1 != null) {
			res.send(JSON.stringify(location1));
		} else {
			res.status(404).json("No se han encontrado localizaciones con esa id");
		}
	} catch (err) {
		next(err);
	}
}

async function getAllLocations(req, res, next) {
	try {
		const session = SessionController.getSession(req, next);
		const locations = await solid.getAllLocations(session, req.session.user);
		res.send(JSON.stringify(locations));
	} catch (err) {
		next(err);
	}
}

async function createLocation(req, res) {
	const { name, latitude, longitude, description, category } = req.body;

	if (!name || !description || !latitude || !longitude) {
		res.status(400).json({ error: "Faltan datos" });
		return;
	}

	const location = new Location(
		name,
		latitude,
		longitude,
		description,
		req.session.user,
		category
	);

	try {
		const session = SessionController.getSession(req, next);
		await solid.saveLocation(session, location, req.session.user);
		res.status(201).json(location);
	} catch (err) {
		next(err);
	}
}

async function updateLocation(req, res) {
	const { id } = req.params;
	const { name, latitude, longitude, description, category } = req.body;

	let location = await solid.getLocationById(
		session.getSession(),
		id,
		req.session.user
	);
	location.name = name || location.name;
	location.latitude = latitude || location.latitude;
	location.longitude = longitude || location.longitude;
	location.description = description || location.description;
	location.category = category || location.category;
	try {
		const session = SessionController.getSession(req, next);
		await solid.saveLocation(session.getSession(), location, req.session.user);
		res.status(200).json(location);
	} catch (err) {
		next(err);
	}
}

async function deleteLocation(req, res) {
	const { id } = req.params;
	try {
		const session = SessionController.getSession(req, next);
		const location = await solid.getLocationById(session, id, req.session.user);
		if (location != null) {
			await solid.deleteLocationById(session, id, req.session.user);
		} else {
			res.status(404).json("No se han encontrado localizaciones con esa id");
			return;
		}
		res.status(204).json({ message: "Location deleted successfully" });
	} catch (err) {
		next(err);
	}
}

//PHOTOS REVIEWS COMMENTS
async function addPhoto(req, res) {
	const { id } = req.params;
	const { name, photoUrl } = req.body;

	if (!photoUrl || !name) {
		res.status(400).json({ error: "Faltan datos" });
		return;
	}
	try {
		const session = SessionController.getSession(req, next);
		let location = await solid.getLocationById(session, id, req.session.user);
		const photo = new Photo(req.session.user, name, photoUrl);
		location.addPhoto(photo);
		await solid.saveLocation(location);
		res.status(201).json({ message: "Photo added successfully" });
	} catch (err) {
		next(err);
	}
}

async function deletePhoto(req, res) {
	const { id } = req.params;
	const { idPhoto } = req.body;
	try {
		const session = SessionController.getSession(req, next);
		await solid.deletePhoto(id, idPhoto);
		res.status(204).json({ message: "Photo removed successfully" });
	} catch (err) {
		next(err);
	}
}

async function addReview(req, res) {
	const { id } = req.params;
	const { rating } = req.body;

	if (!rating) {
		res.status(400).json({ error: "Faltan datos" });
		return;
	}
	try {
		const session = SessionController.getSession(req, next);
		let location = await solid.getLocationById(session, id, req.session.user);
		const review = new Review(rating, req.session.user);

		location.addReview(review);
		await solid.saveLocation(location);
		res.status(201).json({ message: "Photo added successfully" });
	} catch (err) {
		next(err);
	}
}

async function deleteReview(req, res) {
	const { id } = req.params;
	const { idReview } = req.body;
	if (!idReview) {
		res.status(400).json({ error: "Faltan datos" });
		return;
	}
	try {
		const session = SessionController.getSession(req, next);
		await solid.deleteComment(id, idReview);
		res.status(204).json({ message: "Review removed successfully" });
	} catch (err) {
		next(err);
	}
}

async function addComment(req, res) {
	const { id } = req.params;
	const { text } = req.body;

	if (!text) {
		res.status(400).json({ error: "Faltan datos" });
		return;
	}
	try {
		const session = SessionController.getSession(req, next);
		let location = await solid.getLocationById(session, id, req.session.user);
		const comment = new Comment(req.session.user, text);
		location.addComment(commentObject);
		await solid.saveLocation(location);
		res.status(201).json({ message: "Comment added successfully" });
	} catch (err) {
		next(err);
	}
}

async function deleteComment(req, res) {
	const { id } = req.params;
	const { idComment } = req.body;
	try {
		const session = SessionController.getSession(req, next);
		await solid.deleteComment(id, idComment);
		res.status(204).json({ message: "Comment removed successfully" });
	} catch (err) {
		next(err);
	}
}

//  Categories
async function getCategories(req, res) {
	try {
		const session = SessionController.getSession(req, next);
		let categories = await solid.getCategories();
		res.send(JSON.stringify(categories));
	} catch (err) {
		next(err);
	}
}

async function getLocationsByCategory(req, res) {
	const { category } = req.params;
	try {
		const session = SessionController.getSession(req, next);
		let locations = await solid.getAllLocations(
			session.getSession(),
			req.session.user
		);
		locations = locations.filter((location) => location.category === category);
		res.send(JSON.stringify(locations));
	} catch (err) {
		next(err);
	}
}

module.exports = {
	createLocation,
	getAllLocations,
	getLocation,
	deleteLocation,
	updateLocation,
	addReview,
	addPhoto,
	getCategories,
	addComment,
	getLocationsByCategory,
	deletePhoto,
	deleteReview,
	deleteComment,
};
=======
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
