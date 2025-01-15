import { PersonCard } from './PersonCard.js';

export function PeopleTable({ game, teamNames, teamMembers }) {
  return (
    <div className="people-grid">
      {teamNames.map(team =>
          <VerticalList
            game={game}
            key={"team" + team.team_id}
            people={teamMembers[team.team_id]}
          />
      )}
    </div>
  );
}


function VerticalList({ game, people }) {
  return (
    <ul className={'vertical-list'}>
      {people.map(person =>
        <li key={person.name}>
          {PersonCard(person, game)}
        </li>
      )}
    </ul>
  );
}