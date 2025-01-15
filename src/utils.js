export function cleanName(name) {
  return name.toLowerCase().replaceAll(/[ _\-.]/g, "");
}

export function getTwitchLink(siteUsername) {
  return ('https://twitch.tv/' + siteUsername);
}

export function getYoutubeLink(siteUsername) {
  return ('https://youtube.com/@' + siteUsername);
}

export function getSiteImage(sitename) {
  return (
    './website_logos/' + sitename + '.png'
  );
}

export function getPersonImage(person) {
  return (
    './people_images/' +
    cleanName(person.name) +
    '.png'
  );
}



export function MOTD() {
  function getMessage() {
    const messages = [
      <>Join the <a href="https://discord.gg/hoopsquad"><b>Hoop Squad discord</b></a>!</>,
      <>"Meaty"? "Fuzzy"? Look up terms in the <a href="https://glossary.infil.net"><b>Fighting Game Glossary</b></a>!</>,
      <><a href="https://youtu.be/o2aWjkDVric?list=PL6Zpep0TMBYQ9PunFSTptuM2Nml0krqAw"><b>Will It Kill</b></a> happens on the last Friday of the month!</>,
      <>Remember to stretch your hands!</>,
      <>Remember to give yourself props. Repeat after me: <b>"Damn I'm good!"</b></>,
      <>Remember: Pro players make mistakes all the time too!</>
    ];

    const randInt = Math.floor(Math.random() * messages.length);

    return messages[randInt];
  }

  return (
    <div className="motd-container float-right hide-small">
      <div id='speech-bubble' className='speech-bubble'>{getMessage()}</div>
      <img className='motd-mascot' src='unused/slimeTruth.png' alt='Sajam Slam Logo' />
    </div>
  );
}

const slams = [require('./slam1.json')[0], require('./slam2.json')[0], require('./slam3.json')[0], require('./slam4.json')[0]];
export function getSlams() {
  return slams;
}
export function getDefault() { return 4; }

export function NavBar({slamInfo}) {
  return (
    <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
    <nav>
  <div className="wrapper">
    <div className="logo"><a href="#">Logo</a></div>
    <input type="radio" name="slider" id="menu-btn" />
    <input type="radio" name="slider" id="close-btn" />
    <ul className="nav-links">
      <label htmlFor="close-btn" className="btn close-btn"><i className="fas fa-times"></i></label>
      <li>
        <a href={slamInfo.slamNum} className="desktop-item"><i className="fas fa-caret-down"></i> Sajam Slam {slamInfo.slamNum} - {slamInfo.game}</a>
        <input type="checkbox" id="showDrop" />
        <label htmlFor="showDrop" className="mobile-item"><i className="fas fa-caret-down"></i> Sajam Slam {slamInfo.slamNum} - {slamInfo.game}</label>
        <ul className="drop-menu">
          {getSlams().map(eachSlam => 
            <li key={"slam" + eachSlam.slamNum}><a href={eachSlam.slamNum}>Slam {eachSlam.slamNum} - {eachSlam.game}</a></li>
          )}
        </ul>
      </li>
      {slamInfo.liquipedia !== undefined &&
        <>
        <li><a href={slamInfo.liquipedia} className="desktop-item"><img className="site-icon" src={getSiteImage("Liquipedia")} alt="Liquipedia" /></a></li>
        <li><a href={slamInfo.liquipedia} className="mobile-item"><img className="site-icon" src={getSiteImage("Liquipedia")} alt="Liquipedia" /> Liquipedia</a></li>
        </>
      }
      {slamInfo.schedule.map(schedItem =>
        <li key={schedItem.date}>
          {schedItem.status === "future" &&
            <>
            <a href="#" className="eventFuture desktop-item">{schedItem.name}<br/>({schedItem.date})</a>
            <a href="#" className="eventFuture mobile-item">{schedItem.name} ({schedItem.date})</a>
            </>
          }
          {schedItem.status === "current" &&
            <>
            <a className="eventCurrent desktop-item" href="https://twitch.tv/sajam">
              <img className="site-icon" src={getSiteImage("Twitch")} alt="twitch.tv/Sajam" />
              {schedItem.name}<br/>({schedItem.date})
            </a>
            <a className="eventCurrent mobile-item" href="https://twitch.tv/sajam">
              <img className="site-icon" src={getSiteImage("Twitch")} alt="twitch.tv/Sajam" />
              {schedItem.name} ({schedItem.date})
            </a>
            </>
          }
          {schedItem.status === "past" && schedItem.youtubeVod !== undefined &&
            <>
            <a className="eventPast desktop-item" href={"https://youtu.be/" + schedItem.youtubeVod}>
              <img className="site-icon" src={getSiteImage("Youtube")} alt="YouTube VOD" />
              {schedItem.name}<br/>({schedItem.date})
            </a>
            <a className="eventPast mobile-item" href={"https://youtu.be/" + schedItem.youtubeVod}>
              <img className="site-icon" src={getSiteImage("Youtube")} alt="YouTube VOD" />
              {schedItem.name} ({schedItem.date})
            </a>
            </>
          }
        </li>
      )}
    </ul>
    <label htmlFor="menu-btn" className="btn menu-btn"><i className="fas fa-bars"></i></label>
  </div>
</nav>
    </>
  );
}