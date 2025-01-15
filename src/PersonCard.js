import { getIcon, getPortraits } from './CharacterList.js';
import { cleanName, getTwitchLink, getYoutubeLink, getSiteImage, getPersonImage } from './utils.js';

const socials = require('./socials.json');

const MAX_STR_LEN = 17;

/* this is the version with portraits */
export function PersonCard(person, game) {
  let livetext = '';
  let personID = cleanName(person.name);
  let mySocials = null;

  if (personID in socials) {
    mySocials = socials[personID];

    if (mySocials.liveon) {
      livetext = <div className="live-cat w3-large" title={mySocials.livecategory}>{mySocials.livecategory}</div>;
    }
  }

  return (
    <div className={'person-card tier' + person.tier + '-card' + (mySocials.liveon ? '-live' : '-off') }>
      <div>
        <span style={{'fontSize': '22px', 'fontWeight': '600', 'marginLeft': '5px'}}>{person.name}</span>
      </div>
      {PersonPFP(person, mySocials)}
      <div className="person-text">
        {livetext}
        <SocialMediaLinks
          mySocials={mySocials}
        />
      </div>
      {getPortraits(game, person)}
    </div>
  );
}

function SocialMediaLinks(mySocials) {
  if (mySocials)
  {
    return (
      <div className="social-media-links">
        {getTwitchIcon(mySocials)}
        {getYoutubeIcon(mySocials)}
        {getYoutubeStreamIcon(mySocials)}
        {getTwitterIcon(mySocials)}
      </div>
    );
  }
}

function PersonPFP(person, mySocials) {
  let pfpclass = "pfp";
  let livebox = "";

  if (mySocials && mySocials.liveon)
  {
    if (mySocials.liveon.includes('twitch')) {
      pfpclass = "pfp-live red-border";
      livebox = <><div className="live-indicator-box red-bg">LIVE</div></>;
    } else if (mySocials.liveon.includes('youtube')) {
      pfpclass = "pfp-live red-border";
      livebox = <><div className="live-indicator-box red-bg">LIVE</div></>;
    }

    return (
      <a href={mySocials.liveon} title={mySocials.livetitle}>
        <div className="pfp-container">
          <img className={'person-card ' + pfpclass} src={getPersonImage(person)} alt={person.name}/>
          {livebox}
          <PersonSlamCountIndicator person={person} />
          <ReplacementIndicator person={person} />
        </div>
      </a>
    );
  }

  return (
    <div className="pfp-container">
      <img className={'person-card ' + pfpclass} src={getPersonImage(person)} alt={person.name}/>
      {livebox}
      <PersonSlamCountIndicator person={person}/>
      <ReplacementIndicator person={person} />
    </div>
  );
}

function PersonSlamCountIndicator ({person}) {
  if (person.slamcount > 1) {
    let th = "2nd";
    if (person.slamcount === 3) {
      th = "3rd";
    }
    if (person.slamcount > 3) {
      th = person.slamcount + 'th';
    }
    let alttext = "This is " + person.name + "'s " + th + " Sajam Slam!";

    return (
      <div className={'slamcount'} alt={alttext} title={alttext}>
        {person.slamcount}
      </div>
    );
  }

  return;
}

function ExtraNoteIndicator ({person}) {
  if (person.note) {
    return <div className={'extra-note'} alt={person.note} title={person.note}>!</div>;
  }
}

function ReplacementIndicator({person}) {
  if (person.replacement) {
    return (
      <div className={'replacement'} style={{"backgroundImage": "url(./people_images/" + person.replacement + ".png)"}} alt={person.note} title={person.note} />
    );
  }
  else if (person.note) {
    return <ExtraNoteIndicator person={person} />;
  }
}

function getTwitchIcon({mySocials}) {
  if (mySocials.twitch && mySocials.twitch.length > 0) {
    return (
      mySocials.twitch.map( twitchID =>
        <a href={getTwitchLink(twitchID)} key={twitchID}>
         <img className="site-icon" src={getSiteImage("Twitch")} alt="Twitch" title={"@" + twitchID}/>
        </a>
      )
    );
  }

  return '';
}

function getYoutubeIcon({mySocials}) {
  if (mySocials.youtube && mySocials.youtube.length > 0) {
    return (
      mySocials.youtube.map( youtubeID =>
        <a href={getYoutubeLink(youtubeID)} key={youtubeID}>
         <img className="site-icon" src={getSiteImage("Youtube")} alt="YouTube" title={"@" + youtubeID} />
        </a>
      )
    );
  }

  return '';
}

function getYoutubeStreamIcon({mySocials}) {
  if (mySocials["youtube-stream"] && mySocials["youtube-stream"].length > 0) {
    return (
      mySocials["youtube-stream"].map( youtubeID =>
        <a href={getYoutubeLink(youtubeID)} key={youtubeID}>
         <img className="site-icon" src={getSiteImage("Youtube")} alt="YouTube" title={"@" + youtubeID} />
        </a>
      )
    );
  }

  return '';
}

function getTwitterIcon({mySocials}) {
  if (mySocials.twitter) {
    let linkURL = "https://twitter.com/" + mySocials.twitter;

    return (
      <a href={linkURL}>
        <img className='site-icon' src={getSiteImage("Twitter")} alt="Twitter" title={"@" + mySocials.twitter} />
      </a>
    );
  }
  return '';
}



/* this is the version with icons next to name
export function PersonCard(person) {
  let livetext = <>&nbsp;</>;

  if (person.liveon) {
    livetext = <div className="live-cat">{person.livecategory}</div>;
  }

  return (
    <div className={'person-card tier' + person.tier + '-card'}>
      {PersonPFP(person)}
      <div className="person-text">
        <span style={{'fontSize': '1.5em', 'marginLeft': '5px'}}>{person.name}{getIcons(person)}</span>
        <br/>
        {livetext}
        <SocialMediaLinks
          personID={cleanName(person.name)}
        />
      </div>
    </div>
  );
}
*/