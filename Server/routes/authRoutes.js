const express = require('express');
const router = express.Router();


// Verify auth
const auth = (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ message: "Unauthorized" });
      jwt.verify(token, config.tokenSecret);
      return next();
    } catch (err) {
      console.error('Error: ', err);
      res.status(401).json({ message: "Unauthorized" });
    }
  };
  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    if (!token) return res.status(401).send('Access Token Required');
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).send('Invalid/Expired Token');
      req.user = user; // Add the user payload to the request
      next();
    });
  }
  
  /** 
   * Returns the url that the client should navigate to
   */
 router.get('/url', (_, res) => {
    res.json({
      url: `${config.authUrl}?${authParams}`,
    });
  });
  
 router.get('/token', async (req, res) => {
    const { code } = req.query;
    if (!code) return res. status(400).json({ message: 'Authorization code must be provided' });
    try {
      // Get all parameters needed to hit authorization server
      const tokenParam = getTokenParams(code);
      // Exchange authorization code for access token (id token is returned here too)
      const { data: { id_token} } = await axios.post(`${config.tokenUrl}?${tokenParam}`);
      if (!id_token) return res.status(400).json({ message: 'Auth error' });
      // Get user info from id token
      const { email, name, picture } = jwt.decode(id_token);
      const user = { name, email, picture };
      // Sign a new token
      const token = jwt.sign({ user }, config.tokenSecret, { expiresIn: config.tokenExpiration });
      // Set cookies for user
      res.cookie('token', token, { maxAge: config.tokenExpiration, httpOnly: true,  })
      // You can choose to store user in a DB instead
      res.json({
        user,
      })
    } catch (err) {
      console.error('Error: ', err);
      res.status(500).json({ message: err.message || 'Server error' });
    }
  });
  
 router.get('/logged_in', (req, res) => {
    try {
      // Get token from cookie
      const token = req.cookies.token;
      if (!token) return res.json({ loggedIn: false });
      const { user } = jwt.verify(token, config.tokenSecret);
      const newToken = jwt.sign({ user }, config.tokenSecret, { expiresIn: config.tokenExpiration });
      // Reset token in cookie
      res.cookie('token', newToken, { maxAge: config.tokenExpiration, httpOnly: true,  })
      res.json({ loggedIn: true, user });
    } catch (err) {
      res.json({ loggedIn: false });
    }
  });
  
 router.post("/logout", (_, res) => {
    // clear cookie
    res.clearCookie('token').json({ message: 'Logged out' });
  });


  module.exports=router;