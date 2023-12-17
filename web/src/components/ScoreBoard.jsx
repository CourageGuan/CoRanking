import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Team from "../models/Team";
import Match from "../models/Match";
import fifaEloRating from "../utils/rating";

function ScoreBoard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    Team.getAll()
      .then((teams) => {
        console.debug(teams);
        const _players = {};
        teams.forEach((team) => {
          const _team = team.toJSON();
          _team.id = team.id;
          _team.rating = 1000;
          _team.win = 0;
          _team.lose = 0;
          _team.draw = 0;
          _players[team.id] = _team;
        });
        return _players;
      })
      .then((_players) => {
        console.debug(_players);
        Match.getAll(false).then((matches) => {
          matches.forEach((match) => {
            const team0 = _players[match.get("team0").id];
            const team1 = _players[match.get("team1").id];
            if (team0 === undefined || team1 === undefined) { 
                console.error("Team not found", match.get("team0").id, match.get("team1").id);
                return;
            }
            const scoreChange = fifaEloRating(team0.rating, team1.rating, match.get('score0'), match.get('score1'));
            console.debug(team0.rating, team1.rating, match.get('score0'), match.get('score1'), scoreChange);
            team0.rating += scoreChange;
            team1.rating -= scoreChange;
            if (match.get("score0") > match.get("score1")) {
              team0.win++;
              team1.lose++;
            } else if (match.get("score0") < match.get("score1")) {
              team0.lose++;
              team1.win++;
            } else {
              team0.draw++;
              team1.draw++;
            }
          });
          setPlayers(Object.values(_players).sort((a, b) => b.rating - a.rating));
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Win</TableCell>
              <TableCell>Lose</TableCell>
              <TableCell>Draw</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell>{item.rating}</TableCell>
                <TableCell>{item.win}</TableCell>
                <TableCell>{item.lose}</TableCell>
                <TableCell>{item.draw}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ScoreBoard;
