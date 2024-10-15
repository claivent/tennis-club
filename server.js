const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the Angular app's dist directory
app.use(express.static(__dirname + '/dist/client'));

// Redirect all other requests to the Angular app's index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/client/index.html'));
});

// Start the app on the default Heroku port
app.listen(process.env.PORT || 8080);
