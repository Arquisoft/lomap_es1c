//TODO a revisar
const solid = require('../solid/Solid.js');

class AuthController {
  async login(req, res) {
    try {
      const session = await solid.default.popupLogin({
        clientId: process.env.CLIENT_ID,
        redirectUrl: process.env.REDIRECT_URI,
        popupUri: process.env.POPUP_URI
      });

      req.session.webId = session.webId;
      res.redirect('/');
    } catch (err) {
      console.log(`Error logging in: ${err}`);
      res.status(500).send('Error logging in. Please try again later.');
    }
  }

  async logout(req, res) {
    try {
      await solid.default.logout();
      req.session.destroy();
      res.redirect('/');
    } catch (err) {
      console.log(`Error logging out: ${err}`);
      res.status(500).send('Error logging out. Please try again later.');
    }
  }
}

module.exports = AuthController;