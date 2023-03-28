const solid = require('../solid/SolidPrueba.js');

async function getAllFriends(req, res) {
    try {
      const friends = await solid.getAllFriends();
      res.send(JSON.stringify(friends));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching friends' });
    }
  }
  module.exports={
    getAllFriends
  };