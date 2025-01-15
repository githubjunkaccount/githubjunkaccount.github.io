import { PeopleTable } from './PeopleTable.js';
import { CharacterList } from './CharacterList.js';
import { MOTD, NavBar } from './utils.js';

export function Slam({ slamInfo }) {
  let teamMembers = {};
  let charMap = {};

  document.title = "Sajam Slam " + slamInfo.slamNum + " - " + slamInfo.game;

  slamInfo.characters.forEach(char => {
    charMap[char] = 0;
  });

  slamInfo.people.forEach(person => {
    if (!(person.team_id in teamMembers)) {
      teamMembers[person.team_id] = [];
    }
    teamMembers[person.team_id].push(person);

    person.characters.forEach(char => {
      charMap[char] ++;
    });
  });

  return (
    <>
      <NavBar slamInfo={slamInfo} />
      <PeopleTable
        teamNames={slamInfo.teams}
        teamMembers={teamMembers}
        game={slamInfo.game}
      />
      <CharacterList
        game={slamInfo.game}
        charMap={charMap}
      />
      <MOTD/>
    </>
  );
}