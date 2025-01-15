const fetch = require('node-fetch');
const fs = require("fs");
const jsdom = require("jsdom");

const id = "1ac5gXE9Uaaq3gsWvRQSZdtcTSqGwHOHVGR_yosm6GXw";

const buffer = require('buffer');

const TWITCH_CLIENT_ID = '6x6ejzu7tl1kdnhjbzj5d4h8mq428s';
const TWITCH_CLIENT_SECRET = '4e3v55krpt1scmjrlafky69zf2r8f2';

var TWITCH_TOKEN = null;

const filename = './src/socials.json';
let socials = require('./socials.json');

async function requestTwitchToken() {
  try {
    let res = await fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`
    });

    res = await res.json();

    //console.log(res);
    //console.log(res.access_token);

    return res.access_token;
  }
  catch (error) {
    console.log(error);
  }
  return null;
}

async function batchCheckTwitch(twitchIDs) {
  console.log("  batchCheckTwitch");

  const apiURL = `https://api.twitch.tv/helix/streams?user_login=${Object.keys(twitchIDs).join('&user_login=')}`;

  try {
    TWITCH_TOKEN = await requestTwitchToken();

    console.log("    await fetch");
    let res = await fetch(apiURL, {
        method: 'GET',
        headers: {
            'Client-ID': TWITCH_CLIENT_ID,
            'Authorization': 'Bearer ' + TWITCH_TOKEN
        }
    });

    console.log("    await json");
    res = await res.json();

    console.log("    check res.data");
    if (res.data && res.data.length > 0) {
      // console.log(res.data);
      res.data.forEach(twitchObj => {
        const twitchID = twitchObj.user_login;
        const personName = twitchIDs[twitchID];
        const twitchLink = `https://twitch.tv/${twitchID}`;
        const category = twitchObj.game_name;
        const title = twitchObj.title;

        console.log(twitchID, personName, twitchLink, category);

        socials[personName]["liveon"] = twitchLink;
        socials[personName]["livecategory"] = category;
        socials[personName]["livetitle"] = title;

      });
    }
  }
  catch (error) {
    console.log(error);
  }
}

async function checkTwitchAPI(channelName) {
  const apiURL = `https://api.twitch.tv/helix/streams?user_login=${channelName}`;

  try {
    TWITCH_TOKEN = await requestTwitchToken();

    console.log("    await fetch");
    let res = await fetch(apiURL, {
        method: 'GET',
        headers: {
            'Client-ID': TWITCH_CLIENT_ID,
            'Authorization': 'Bearer ' + TWITCH_TOKEN
        }
    });

    console.log("    await json");
    res = await res.json();

    console.log("    check res.data");
    if (res.data && res.data.length > 0)
      return [`https://twitch.tv/${channelName}`, res.data[0].game_name];
    else
      return ['', ''];
  }
  catch (error) {
    console.log(error);
  }

  return ['', ''];
}

async function checkIfYoutubeLive(channelName) {
  let attempts = 0;

  while (attempts < 5)
  {
    attempts += 1;
    try {
      const url = `https://www.youtube.com/@${channelName}/live`;
    	const res = await fetch(url);
      const text = (await res.text());

      console.log(text.includes('"status":"OK"'));

    	if (text.includes('"status":"OK"')) {
        const dom = new jsdom.JSDOM(text, { resources: "usable" });

        const gamePattern = /(?<=richMetadataRenderer.*?,"title":\{"simpleText":")[^\}]*?(?="},)/;
        const found = text.match(gamePattern);

        const categoryText = (found ? found[0] : "Just Chatting");
        const titleText = dom.window.document.querySelector("meta[name='title']").content;

        // console.log(categoryText, titleText);

        return [url, categoryText, titleText];
      } else {
        return ["", "", ""];
      }
    } catch (error) {
      console.log("Attempt " + attempts + ": ", error);
    }
  }
  return ["", "", ""];
}

async function runOnce() {
  var date = new Date();
  console.log("[" + date.toLocaleString() + "]", "runOnce BEGIN");

  const personNames = Object.keys(socials);

  // console.log(socials);
  // console.log(personNames);

  let twitchIDs = {};
  let twitchIDsLength = 0;

  for (i in personNames)
  {
    const personName = personNames[i];
    //console.log(`  ${personName}`);
    let personSocials = socials[personName];
    // console.log(personSocials);

    socials[personName]["liveon"] = "";
    socials[personName]["livecategory"] = "";
    socials[personName]["livetitle"] = "";

    let liveOn = "";
    let liveCategory = "";

    if ("twitch" in personSocials)
    {
      for (j in personSocials['twitch'])
      {
        const twitchID = personSocials['twitch'][j];

        twitchIDs[twitchID] = personName;
        twitchIDsLength += 1;

        if (twitchIDsLength > 99) {
          await batchCheckTwitch(twitchIDs);
          twitchIDs = {};
          twitchIDsLength = 0;
        }
      }
    }


    if ("youtube-stream" in personSocials)
    {
      for (j in personSocials["youtube-stream"])
      {
        if (socials[personName]["liveon"] === "")
        {
          const youtubeID = personSocials['youtube-stream'][j];
          console.log(`    checkIfYoutubeLive ${youtubeID}`);
          [socials[personName]["liveon"], socials[personName]["livecategory"], socials[personName]["livetitle"]] = await checkIfYoutubeLive(youtubeID);
        }
      }
    }
  }

  if (twitchIDsLength > 0)
    await batchCheckTwitch(twitchIDs);

  console.log(`  write ${filename}`);
  fs.writeFileSync(filename, JSON.stringify(socials, null, 1));


  date = new Date();
  console.log("[" + date.toLocaleString() + "]", "runOnce END");
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runLoop() {
	const sleeptime = 3 * 60 * 1000;

	while(1)
	{
		await runOnce();
		console.log(`Sleeping for ${sleeptime} ms`);
		await sleep(sleeptime);
	}
}


runOnce();