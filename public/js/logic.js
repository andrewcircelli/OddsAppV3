// array
let sbOddsArr          = [];
let afcOddsArr         = [];
let nfcOddsArr         = [];
let completedGamesArr  = [];
let inProgressGamesArr = [];
let scheduledGamesArr  = [];
let newsArr            = [];


// ===============================================================================================
$(document).ready(async () => {
  let year;
  let week;
  const getCompletedGamesApi = `/${year}/${week}`;
  const getCompletedGamesRes = await $.ajax({
    getCompletedGamesApi,
    method: 'GET'
  });
}); // end document.ready() function
