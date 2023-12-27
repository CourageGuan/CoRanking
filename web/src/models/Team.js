import AV from "./leancloud";

class Team extends AV.Object {

  static name = "Team";
  static {
    AV.Object.register(Team);
  }

  static async create(data) {
    const { name } = data;
    if (!name) throw new Error("name is required");
    if (name.length > 20) throw new Error("name is too long");
    if (name.length < 2) throw new Error("name is too short");
    if (await Team.getByName(name).length > 0) throw new Error("name is duplicated");

    const team = new Team();
    team.set("name", name);
    return team.save(team);
  }

  static async get(id) {
    const query = new AV.Query(Team.name);
    return query.get(id);
  }

  static async getAll() {
    const query = new AV.Query(Team.name);
    return query.find();
  }

  static async getByName(name) {
    const query = new AV.Query(Team.name);
    query.equalTo("name", name);
    return query.find();
  }
}

export default Team;