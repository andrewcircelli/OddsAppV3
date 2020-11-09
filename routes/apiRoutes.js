// sportdata.io key
let sportDataApiKey = '?key=acf8068f55284fd4afd0b96f698b5b32'; 
let week            = '/9';

// sportsdata.io ajax calls
// ===============================================================================================
// afc futures odds call
const afcOdds = () => {
  try {
    return $.ajax({
        'url': 'http://api.sportsdata.io/v3/nfl/odds/json/BettingFuturesBySeason/' + '2020' + sportDataApiKey,
        'method': 'GET'
      });
  } catch (err) {
    console.log(err);
  }
};
// nfc futures odds call
const nfcOdds = () => {
  try {
    return $.ajax({
        'url': 'http://api.sportsdata.io/v3/nfl/odds/json/BettingFuturesBySeason/' + '2020' + sportDataApiKey,
        'method': 'GET'
      });
  } catch (err) {
    console.log(err);
  }
};

// sb futures odds call
const sbOdds = () => {
  try {
    return $.ajax({
        'url': 'http://api.sportsdata.io/v3/nfl/odds/json/BettingFuturesBySeason/' + '2020' + sportDataApiKey,
        'method': 'GET'
      });
  } catch (err) {
    console.log(err);
  }
};

// ===============================================================================================
// getNews() call
const getNews = () => {
  try {
    return $.ajax({
        'url': 'https://api.sportsdata.io/v3/nfl/scores/json/News' + sportDataApiKey,
        'method': 'GET'
      });
  } catch (err) {
    console.log(err);
  }
};

// ===============================================================================================  
// getTeamDetails() call
const getTeamDetails = () => {
  try {
    return $.ajax({
        'url': 'https://api.sportsdata.io/v3/nfl/scores/json/AllTeams' + sportDataApiKey,
        'method': 'GET'
      });
  } catch (err) {
    console.log(err);
  }
};

// =============================================================================================== 
// getCompletedGames() call
const getCompletedGames = () => {
  try {
    return $.ajax({
        'url': 'https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/' + '2020' + week + sportDataApiKey,
        'method': 'GET'
      });
  } catch (err) {
    console.log(err);
  }
};

// ===============================================================================================
// getScheduledGames and getGameDetails calls
const getScheduledGames = () => {
  try {
    return $.ajax({
        'url': 'https://api.sportsdata.io/v3/nfl/odds/json/GameOddsByWeek/' + '2020' +  week + sportDataApiKey,
        'method': 'GET'
      });
  } catch (err) {
    console.log(err);
  }
};

const getGameDetails = () => {
  try {
    return $.ajax({
        'url': 'https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/' + '2020' + week + sportDataApiKey,
        'method': 'GET'
      });
  } catch (err) {
    console.log(err);
  }
};

// ===============================================================================================
// getInProgressGames() call

const getInProgressGames = () => {
  try {
    return $.ajax({
        'url': 'https://api.sportsdata.io/v3/nfl/odds/json/LiveGameOddsByWeek/' + '2020' + week + sportDataApiKey,
        'method': 'GET'
      });
  } catch (err) {
    console.log(err);
  }
};
