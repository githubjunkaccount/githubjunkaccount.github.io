import { cleanName } from './utils.js';


function selectChar(charNameIconClass) {
  let icons = document.getElementsByClassName('card-char-icon');

  for (let i = 0; i < icons.length; i++) {
    let icon = icons[i];
    if (!(icon.classList.contains(charNameIconClass))) {
      //icon.style.visibility = 'hidden';
      icon.classList.add('char-icon-not-hovered');
    } else {
      icon.classList.add('char-icon-hovered');
    }
  }
}

function deselectChar(charNameIconClass) {
  let icons = document.getElementsByClassName('card-char-icon');

  for (let i = 0; i < icons.length; i++) {
    let icon = icons[i];
    icon.style.visibility = 'visible';
    icon.classList.remove("char-icon-hovered");
    icon.classList.remove('char-icon-not-hovered');
  }
}

function getIconFile(game, charName) {
  return (
    './' + game + '_images/icons/' +
    cleanName(charName) +
    '.png'
  );
}

export function getCharIcons(game, person) {
  return (
    <>{person.characters.map(character =>
        <img className={"char-icon card-char-icon margin-left5 " + cleanName(character) + "-icon"} src={getIconFile(game, character)} alt={character} title={character} />
    )}</>
  );
}

function getPortraitFile(game, charName) {
  return (
    './' + game + '_images/portraits/' +
    cleanName(charName) +
    '.png'
  );
}

export function getPortraits(game, person) {
  if (person.characters && person.characters.length > 1) {
    let char1 = person.characters[0];
    let char2 = person.characters[1];
    let charNameIconClass1 = cleanName(char1) + '-icon';
    let charNameIconClass2 = cleanName(char2) + '-icon';

    return (
    <>
      <span className={"top-only"}>
        <img
          className={"char-big-half card-char-icon mask-gradient " + cleanName(char1) + "-icon"}
          src={getPortraitFile(game, char1)}
          alt={char1}
          title={char1}
          onMouseEnter={() => selectChar(charNameIconClass1)}
          onMouseLeave={() => deselectChar(charNameIconClass1)}
        />
      </span>
      <span className={"bot-only"}>
        <img
          className={"char-big-half card-char-icon mask-gradient " + cleanName(char2) + "-icon"}
          src={getPortraitFile(game, char2)}
          alt={char2}
          title={char2}
          onMouseEnter={() => selectChar(charNameIconClass2)}
          onMouseLeave={() => deselectChar(charNameIconClass2)}
        />
      </span>
    </>
    );
  } else if (person.characters && person.characters.length === 1) {
    let character = person.characters[0];
    let charNameIconClass = cleanName(character) + '-icon';
    return (
      <img
        className={"char-big card-char-icon mask-gradient " + cleanName(character) + "-icon"}
        src={getPortraitFile(game, character)}
        alt={character}
        title={character}
        onMouseEnter={() => selectChar(charNameIconClass)}
        onMouseLeave={() => deselectChar(charNameIconClass)}
      />
    );
  }
}


export function CharacterList({game, charMap}) {
  let outMap = [];

  for (var charName in charMap) {
    let charNameIconClass = cleanName(charName) + "-icon";

  	let classes = "char-icon " + charNameIconClass;
  	let counterText = charMap[charName];

  	if (charMap[charName] === 0) {
  		classes += " low-opacity";
  	}

  	outMap.push(
  		<div key={charName + "-div"} className="char-count-container">
  			<img
          className={classes}
          key={charName + "-img"}
          src={getIconFile(game, charName)}
          alt={charName}
          title={charName}
          onMouseEnter={() => selectChar(charNameIconClass)}
          onMouseLeave={() => deselectChar(charNameIconClass)}
        />
  			<br/>{ counterText ? counterText : <><br/></> }
  		</div>
	);
  }

  return (
  	<div className="character-list">
        {outMap}
    </div>
  );
}