// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give the server useful functionality
// ==============================================================================
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
// const { response } = require('express');
const axios = require('axios').default;


// sportdata.io key
// let sportDataApiKey = '?key=acf8068f55284fd4afd0b96f698b5b32'; 
// const year            = '2020';
// const week            = '/9';

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

// Set Handlebars as the default templating engine.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/:year/:week', async (req, res) => {
  // serving an html file
  // res.sendFile(path.join(__dirname, '/views', '/index.html'));
  // serving a template
  // res.render('index');
  const { year } = req.params;
  const { week } = req.params;

  const completedGamesArr = [];
  const getCompletedGamesApi = `https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/${year}/${week}?key=acf8068f55284fd4afd0b96f698b5b32`;
  const completedGamesResArr = await axios.get(getCompletedGamesApi);
  const completedGamesDataArr1 = completedGamesResArr.data;
  const completedGamesDataArr = completedGamesDataArr1.filter((gameEl) => gameEl.Status === 'Final');
  completedGamesDataArr.forEach((completedGameEl) => {
    const scoreCheck = (completedGameEl.HomeScore > completedGameEl.AwayScore);
    completedGamesArr.push({
      homeWon:               scoreCheck,
      gameKey:               completedGameEl.GameKey,
      scoreID:               completedGameEl.ScoreID,
      homeTeam:              completedGameEl.HomeTeam,
      homeTeamID:            completedGameEl.HomeTeamID,
      awayTeam:              completedGameEl.AwayTeam,
      awayTeamID:            completedGameEl.AwayTeamID,
      homeScore:             completedGameEl.HomeScore,
      awayScore:             completedGameEl.AwayScore,
      channel:               completedGameEl.Channel,
      forecastLow:           completedGameEl.ForecastTempLow,
      forecastHigh:          completedGameEl.ForecastTempHigh,
      forecastDesc:          completedGameEl.ForecastDescription,
      stadiumName:           completedGameEl.StadiumDetails.Name,
      stadiumCity:           completedGameEl.StadiumDetails.City,
      stadiumState:          completedGameEl.StadiumDetails.State
    });
  });
  res.render('index', completedGamesArr);
});

// LISTENER
// The below code effectively 'starts' our server
// =============================================================================

app.listen(PORT, () => {
  console.log(`App listening on PORT: ' + ${PORT}`);
});
