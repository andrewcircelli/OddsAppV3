const express = require('express');
const axios = require('axios').default;

const router = express.Router();

const getCompletedGames = (year, week) => {
  try {
    return axios.get(`https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/${year}/${week}?key=acf8068f55284fd4afd0b96f698b5b32`);
  } catch (err) {
    console.log(err);
  }
};

const completedGamesArr = [];

router.get('/:year/:week', async (req, res, next) => {
  const completedGamesResArr = await getCompletedGames(year, week);
  const { data } = completedGamesResArr;
  const completedGamesDataArr = data.filter((gameEl) => gameEl.Status === 'Final');
  completedGamesDataArr.forEach((completedGameEl) => {
    const scoreCheck = (completedGameEl.HomeScore > completedGameEl.AwayScore);
    completedGamesArr.push({
      homeWon: scoreCheck,
      gameKey: completedGameEl.GameKey,
      scoreID: completedGameEl.ScoreID,
      homeTeam: completedGameEl.HomeTeam,
      homeTeamID: completedGameEl.HomeTeamID,
      awayTeam: completedGameEl.AwayTeam,
      awayTeamID: completedGameEl.AwayTeamID,
      homeScore: completedGameEl.HomeScore,
      awayScore: completedGameEl.AwayScore,
      channel: completedGameEl.Channel,
      forecastLow: completedGameEl.ForecastTempLow,
      forecastHigh: completedGameEl.ForecastTempHigh,
      forecastDesc: completedGameEl.ForecastDescription,
      stadiumName: completedGameEl.StadiumDetails.Name,
      stadiumCity: completedGameEl.StadiumDetails.City,
      stadiumState: completedGameEl.StadiumDetails.State
    });
  });
  // res.status(200).json({
  //   message: `Handling GET request for year: ${year} and week: ${week}`,
  //   curatedData: completedGamesArr
  // });
  res.render('index', completedGamesArr);
});

module.exports = router;
