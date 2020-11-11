const express = require('express');

const router = express.Router();
const axios = require('axios').default;

const getCompletedGames = (year, week) => {
  try {
    return axios.get(`https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/${year}/${week}?key=acf8068f55284fd4afd0b96f698b5b32`);
  } catch (err) {
    console.log(err);
  }
};

const getTeamDetails = () => {
  try {
    return axios.get(`https://api.sportsdata.io/v3/nfl/scores/json/AllTeams?key=acf8068f55284fd4afd0b96f698b5b32`);
  } catch (err) {
    console.log(err);
  }
};

const completedGamesArr = [];

router.get('/:year/:week', async (req, res, next) => {
  // handle bad request
  if (!req.params.year || !req.params.week) {
    res.status(400).send('Request URL should end in /NFL/[YEAR]/[WEEK]');
    return;
  }
  const { year } = req.params;
  const { week } = req.params;
  const completedGamesResArr = await getCompletedGames(year, week);
  const completedGamesDataArr = completedGamesResArr.data;
  const completedGamesFilteredArr = completedGamesDataArr.filter((gameEl) => gameEl.Status === 'Final');
  completedGamesFilteredArr.forEach((completedGameEl) => {
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
  const teamDetailsResArr = await getTeamDetails();
  const teamDetailsDataArr = teamDetailsResArr.data;
  teamDetailsDataArr.forEach((teamDetailEl) => {
    const teamID = teamDetailEl.TeamID;
    completedGamesArr.forEach((gameEl) => {
      if (teamID === gameEl.homeTeamID) {
        gameEl.homeTeamFullName = teamDetailEl.FullName;
        gameEl.homeTeamLogo     = teamDetailEl.WikipediaLogoUrl;
        gameEl.homeHeadCoach    = teamDetailEl.HeadCoach;
      } else if (teamID === gameEl.awayTeamID) {
        gameEl.awayTeamFullName = teamDetailEl.FullName;
        gameEl.awayTeamLogo     = teamDetailEl.WikipediaLogoUrl;
        gameEl.awayHeadCoach    = teamDetailEl.HeadCoach;
      }
    });
  });
  res.render('index', completedGamesArr);
});

module.exports = router;
