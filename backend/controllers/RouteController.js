
const solid = require('../solid/SolidPrueba.js');


  async function getAllRoutes(req, res) {
    try {
      const routes = await solid.getAllRoutes()

      res.send(JSON.stringify(routes));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching routes' });
    }
  }

  async function deleteFromRoute(req, res) {
    const { id } = req.params;
    try {

      await solid.deleteLocationFromRouteById(id);
      res.sendStatus(204);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  module.exports={
    getAllRoutes
  };