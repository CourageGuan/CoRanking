import { useState, useEffect } from "react";
import {
  List,
  ListItem,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import Match from "../models/Match";
import Team from "../models/Team";

function MatchList() {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [team0, setTeam0] = useState("");
  const [score0, setScore0] = useState("");
  const [team1, setTeam1] = useState("");
  const [score1, setScore1] = useState("");
  const [error, setError] = useState({
    team0: false,
    score0: false,
    team1: false,
    score1: false,
  });

  const handleScoreChange = (scoreSetter) => (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, ""); // Remove all non-digit characters

    if (value === "") {
      scoreSetter("");
    } else {
      scoreSetter(Math.max(0, parseInt(value)).toString());
    }
  };

  const validateInput = () => {
    const newError = {
      team0: !team0 || team0 === team1,
      score0: score0 === "",
      team1: !team1 || team0 === team1,
      score1: score0 === "",
    };

    setError(newError);
    return Object.values(newError).every((v) => !v);
  };

  const handleAdd = () => {
    if (validateInput()) {
      Match.create({
        team0: team0,
        score0: parseInt(score0),
        team1: team1,
        score1: parseInt(score1),
        time: new Date(),
      }).then(
        (match) => {
          console.debug(match);
          setMatches([match, ...matches]);
          setTeam0("");
          setScore0("");
          setTeam1("");
          setScore1("");
          setError({
            team1: false,
            score1: false,
            team2: false,
            score2: false,
          });
        },
        (error) => {
          alert("Error creating match");
          console.error(error);
        }
      );
    }
  };

  // fetch matches list
  useEffect(() => {
    Match.getAll()
      .then((matches) => {
        setMatches(matches);
        console.debug(matches);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // fetch teams list
  useEffect(() => {
    Team.getAll()
      .then((teams) => {
        setTeams(teams);
        // console.debug(teams);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <List>
        <ListItem>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <FormControl style={{ minWidth: 120 }}>
                <InputLabel>Home</InputLabel>
                <Select
                  value={team0}
                  onChange={(e) => setTeam0(e.target.value)}
                  error={error.team0}
                >
                  {teams.map((team) => (
                    <MenuItem key={team.id} value={team.id}>
                      {team.get('name')}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <TextField
                label="Score"
                type="number"
                value={score0}
                onChange={handleScoreChange(setScore0)}
                error={error.score0}
                // helperText={error.score0 ? "Invalid Score" : ""}
                style={{ marginLeft: 10, maxWidth: 80 }}
              />
            </Grid>

            <Grid item>
              <span style={{ margin: "0 10px" }}> - </span>
            </Grid>

            <Grid item>
              <TextField
                label="Score"
                type="number"
                value={score1}
                onChange={handleScoreChange(setScore1)}
                error={error.score1}
                // helperText={error.score1 ? "Invalid Score" : ""}
                style={{ marginLeft: 0, maxWidth: 80 }}
              />
            </Grid>

            <Grid item>
              <FormControl style={{ minWidth: 120, marginLeft: 10 }}>
                <InputLabel>Guest</InputLabel>
                <Select
                  value={team1}
                  onChange={(e) => setTeam1(e.target.value)}
                  error={error.team1}
                >
                  {teams.map((team) => (
                    <MenuItem key={team.id} value={team.id}>
                      {team.get('name')}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <Button onClick={handleAdd} style={{ marginLeft: 10 }}>
                Add
              </Button>
            </Grid>
          </Grid>
        </ListItem>

        {matches.map((item, index) => (
          <ListItem key={index}>
            <Grid container spacing={2} alignItems="center">
              <Grid item style={{ minWidth: 120 }}>
                {teams.find(team => team.id === item.get('team0').id)?.get('name')}
              </Grid>
              <Grid item>{item.get('score0')}</Grid>
              <Grid item>
                <span> - </span>
              </Grid>
              <Grid item>{item.get('score1')}</Grid>
              <Grid item style={{ minWidth: 120 }}>
                {teams.find(team => team.id === item.get('team1').id)?.get('name')}
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default MatchList;
