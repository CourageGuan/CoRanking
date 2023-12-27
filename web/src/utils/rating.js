
/**
 * https://eloratings.net/about
 * @param {number} rating0 the current rating of team0
 * @param {number} rating1 the current rating of team1
 * @param {number} goal0 the goal of team0
 * @param {number} goal1 the goal of team1
 * @param {number} k The importance of a match, we set it default to 30
 * @return {number} the rating change of team0
 **/
export const fifaEloRating = (rating0, rating1, goal0, goal1, k = 30) => {
  // @param {number} n the goal difference
  // @param {number} g the goal difference factor
  // @param {number} w the result of the match, 1 for win, 0.5 for draw, 0 for lose
  // @param {number} dr the rating difference
  // @param {number} we the expected result of the match
  const n = Math.abs(goal0 - goal1);
  const g = n < 2 ? 1 : (n === 2 ? 1.5 : (n + 11) / 8);
  const w = goal0 === goal1 ? 0.5 : goal0 > goal1 ? 1 : 0;
  const dr = rating0 - rating1;
  const we = 1 / (Math.pow(10, -dr / 400) + 1);
  //console.log(`n: ${n}, g: ${g}, k: ${k}, w: ${w}, dr: ${dr}, we: ${we}`);

  return Math.round(k * g * (w - we));
};

const testFifaEloRating = () => {
  let rating0 = 2149;
  let rating1 = 2076;
  let goal0 = 3;
  let goal1 = 3;
  let k = 60;
  let ratingChange = fifaEloRating(rating0, rating1, goal0, goal1, k); // -6
  console.assert(ratingChange === -6, `ratingChange: ${ratingChange}`);
  
  rating0 = 2120;
  rating1 = 1952;
  goal0 = 3;
  goal1 = 0;
  k = 60;
  ratingChange = fifaEloRating(rating0, rating1, goal0, goal1, k); // +29
  console.assert(ratingChange === 29, `ratingChange: ${ratingChange}`);

  rating0 = 2120 + 100;
  rating1 = 2122;
  goal0 = 1;
  goal1 = 7;
  k = 60;
  ratingChange = fifaEloRating(rating0, rating1, goal0, goal1, k); // -81
  console.assert(ratingChange === -81, `ratingChange: ${ratingChange}`);
}

testFifaEloRating();