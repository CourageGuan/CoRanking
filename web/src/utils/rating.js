
/**
 * ref: https://zh.wikipedia.org/wiki/%E5%9B%BD%E9%99%85%E8%B6%B3%E7%90%83%E7%AD%89%E7%BA%A7%E5%88%86%E6%8E%92%E5%90%8D#%E5%88%86%E6%95%B0%E8%AE%A1%E7%AE%97%E7%9A%84%E5%9F%BA%E6%9C%AC%E5%8E%9F%E7%90%86
 * ref: https://eloratings.net/
 * @param {number} rating0 the current rating of team0
 * @param {number} rating1 the current rating of team1
 * @param {number} goal0 the goal of team0
 * @param {number} goal1 the goal of team1
 * @param {number} k The importance of a match, we set it default to 32
 * @return {number} the rating change of team0
 **/
const fifaEloRating = (rating0, rating1, goal0, goal1, k = 32) => {
  // @param {number} n the goal difference
  // @param {number} g the goal difference factor
  // @param {number} w the result of the match, 1 for win, 0.5 for draw, 0 for lose
  // @param {number} dr the rating difference
  // @param {number} we the expected result of the match
  const n = goal0 - goal1;
  const g = Math.abs(n) < 2 ? 1 : (Math.abs(n) === 2 ? 1.5 : (11 + Math.abs(n)) / 8);
  const w = goal0 === goal1 ? 0.5 : goal0 > goal1 ? 1 : 0;
  const dr = rating0 - rating1;
  const we = 1 / (Math.pow(10, dr / 400) + 1);

  return Math.round(k * g * (w - we));
};

export default fifaEloRating;