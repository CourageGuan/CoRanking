import AV from "./leancloud";
import Team from "./Team";

class Match extends AV.Object {
  static {
    AV.Object.register(Match);
  }

  static async create(data) {
    const { team0, team1, score0, score1, time } = data;
    const oTeam0 = AV.Object.createWithoutData(Team.name, team0), oTeam1 = AV.Object.createWithoutData(Team.name, team1);
    const match = new Match();
    match.set("team0", oTeam0);
    match.set("team1", oTeam1);
    match.set("score0", score0);
    match.set("score1", score1);
    match.set("time", time);
    return match.save(match);
  }

  static async getAll() {
    const query = new AV.Query(Match.name);
    return query.addDescending('time').find();
  }
}

export default Match;