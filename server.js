// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give the server useful functionality
// ==============================================================================
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an 'express' server
const app = express();

// Sets an initial port
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Sets up the Express app to establish a static directory to access static files
app.use(express.static(path.join(__dirname, '/public')));
// Serve the corresponding node_modules folder if file is not found in public
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

// Set Handlebars as the default templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', __dirname, '/views');

const completeAPI = require('./routes/completed');

app.use('/NFL', completeAPI);
app.use((req, res, next) => {
  const err = new Error('Page Not Found!');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  // assign error status to the error that has been passed from the above middleware
  // or if the error originated in another portion of app, assign 500 status
  res.status(err.status || 500);
  res.json({
    err: {
      message: err.message
    }
  });
});

// LISTENER
// The below code effectively 'starts' our server
// =============================================================================

app.listen(PORT, () => {
  console.log(`App listening on PORT: ' + ${PORT}`);
});
