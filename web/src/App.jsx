import { useEffect, useState } from 'react'
import Team from './models/Team'
import Match from './models/Match'
import MatchList from './components/MatchList'
import ScoreBoard from './components/ScoreBoard'

function App() {
  const [ teams, setTeams ] = useState([]);
  const [ matches, setMatches ] = useState([]);

  // fetch teams list
  useEffect(() => {
    Team.getAll()
      .then((teams) => {
        setTeams(teams);
        console.debug(teams);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
  }, [setMatches]);

  return (
    <div>
      <ScoreBoard teams={teams} matches={matches} />
      <MatchList teams={teams} matches={matches} setMatches={setMatches} />
    </div>
  );
}

export default App
