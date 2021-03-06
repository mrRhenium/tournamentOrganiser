// fetch the tournament Record form the loacal storage to display in page
// it will also show the tournament type like by points and by won matches
//

//
// Get the json file from the local storage of the our browser
let tournamentList = localStorage.getItem("tournamentHistory");
tournamentList = JSON.parse(tournamentList);
console.log(tournamentList);
//

//
// set the no of list which is listed in local storage
// we targetint the tournament profile div for storing the tournament records
const tournamentProfileBody = document.querySelector(".tournamentProfileBody");
tournamentList.map((item) => {
  tournamentProfileBody.innerHTML += `<div class="tournamentProfileList">
  <span class="tntProfItems" style="width: 90%; padding: 0.1rem;background-color: rgba(226, 35, 10, 0.5);border:1px solid white">
  <a style="transform: translateX(0rem); margin: 0 0;color:white;font-size:1rem"
 >Ranking - ${item[0].tournamentType}</a></span>

  <span class="tntProfItems" style="width: 60%; padding: 0.1rem;background-color: rgba(23, 236, 4, 0.5);border:1px solid white">
  <a style="transform: translateX(0rem); margin: 0 0;color:black"
 >${item[0].date.substr(0, 10)}</a></span>
 </div>`;
});

// set profile of player which is played on the day which is mentioned
// and also set the tournament type which is selected by the user
const tournamentProfileList = document.querySelectorAll(
  ".tournamentProfileList"
);
for (var i = 0; i < tournamentList.length; i++) {
  tournamentList[i].map((item, index) => {
    if (index > 0) {
      tournamentProfileList[
        i
      ].innerHTML += `<span class="tntProfItems itemFlexbox">
   <a id="rankItems">${item.rank + 1}.</a>
   <a style="font-size:1.4rem;margin-bottom:.7rem;color:darkgreen;text-shadow:0 0 5px white;">${
     item.name
   }</a>
   <a>Win-(${item.winMatches})</a>
   <a>Lose-(${item.loseMatches})</a>
   <a>Points : ${item.points}</a> </span>`;
    }
  });
}
//end here
//

//
// adding speaking btn in all profile list for assitant
for (var i = 0; i < tournamentProfileList.length; i++) {
  let speakbox = `<span
  class="tntProfItems"
  style="min-height: 45px; width: 30%"
  id="speakingBtn"
  ><a style="margin: 0; transform: translateX(0)">Speak</a>
  </span>`;
  tournamentProfileList[i].insertAdjacentHTML("beforeend", speakbox);
}
// ends here

// speaking functionality define here
const startSpeakProfile = (sentence) => {
  const speech = new SpeechSynthesisUtterance();
  speech.lang = "hi-GB";
  speech.text = sentence;
  speech.volume = 1; //0-1
  speech.rate = 0.8; //0.1-10
  speech.pitch = 1; //0-2
  console.log("started speaking");
  speechSynthesis.speak(speech);
};

// speakign functionality goes ends here

// Speaking funcitonality in tournament profile matches history
const speakingBtn = document.querySelectorAll("#speakingBtn");
// const speakingBtnValue = document.querySelectorAll("#speakingBtnValue");
// assitant scirpt which she speaks to us
let scriptOfAssitant = "";
for (let i = 0; i < tournamentList.length; i++) {
  // which were we selected
  let speakId = 0;

  // we clicked the speak btn in profile selection
  speakingBtn[i].addEventListener("click", () => {
    // if (speakingBtn[i].innerHTML == "<a>Speak</a>") {
    speakId = i;
    console.log("this one " + speakId);

    scriptOfAssitant += `In the tournament which took place on ${tournamentList[
      speakId
    ][0].date.substr(0, 10)}
    , Whose type ${
      tournamentList[speakId][0].tournamentType
    } and the winner is ${tournamentList[speakId][1].name}`;

    tournamentList[speakId].map((item, index) => {
      let pos = "";
      if (index == 2) pos = "nd";
      else if (index == 3) pos = "rd";
      else pos = "th";

      if (index > 1) {
        return (scriptOfAssitant += ` and ${item.rank + 1}${pos} position got ${
          item.name
        }`);
      }
    });

    scriptOfAssitant += ` soooo  at the laaaast whoo is the hero and winner of our tournament  ${tournamentList[speakId][1].name} congratulationss`;

    // call the function for speaking the selected the profile
    startSpeakProfile(scriptOfAssitant);
    console.log(scriptOfAssitant);

    // again define to null
    scriptOfAssitant = "";
    // }
  });
}

// end of the script
