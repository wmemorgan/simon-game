var aiSeq = [],
 playerSeq = [],
 level = 0,
 playCount,
 gameLimit = 5,
 powerOff = 0,
 timer,
 lens = document.getElementsByClassName('lens'),
 green = document.getElementById('green'),
 red = document.getElementById('red'),
 yellow = document.getElementById('yellow'),
 blue = document.getElementById('blue'),
 brutalIndicator = document.getElementById('brutal-indicator'),
 countDisplay = document.getElementById('count-display'),
 startButton = document.getElementById('start-btn'),
 brutalButton = document.getElementById('brutal-btn'),
 powerButton = document.getElementById('power-btn'),
 colorArr = ["green", "red", "yellow", "blue"],
 lightColorsArr = ["liteGreen", "liteRed", "liteYell", "liteBlue"],
 gameSounds = [
  "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3", //green 
  "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3", //red
  "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3", //yellow
  "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3" //blue
 ];

const randomNumGenerator = (max=4) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const createSequence = (arr) => {
  if (playCount === gameLimit) {
    console.log("Game over, man!");
    return true;
  } else {
    // return new Promise (resolve => {
      // setTimeout(() => {
      arr.push(randomNumGenerator());
      // arr.push(0, 2, 1)
      // flashing(aiSeq, lens);
      console.log("Random generated array is:", arr);
      // }, 500);
    //   return resolve;
    // });
    // (reject => {console.log("I'm afraid I can't do that.")});
    }
}


// const seqInput = (arr, index) => {
//   return () => {
//     // if (powerOff === 0) {
//     //   lens[index].removeEventListener("click", seqInput(arr, index));
//     // } else {
//         // new Promise (resolve => {
//         //   console.log("The index is:", index);
//         //   arr.push(index);
//         //   console.log("The array is:", arr);
//         // });
//         // (reject => {console.log("I won't do that!")});

//           // const promise = Promise.resolve(addToArray(arr, index));
//             // reject(console.log("I won't do that!"));
//           // const promise = Promise.resolve("Success").then(() => {
//               arr.push(index);
//               console.log("Player array is:", arr);
//           // });
//       // }
//     }
// }

// const addToArray = (arr, index) => {
//   arr.push(index);
//   console.log("Player array is:", arr);
// }



const lightUp = (event, element, index) => {
  return () => {
    if (powerOff === 0) {
      element.removeEventListener(event, lightUp(event, element, index));
    } else {
      if (event === "mousedown") {
        element.classList.add(lightColorsArr[index]);
        playSound(gameSounds[index]);
      } else if (event === "mouseup") {
        let resetLight = () => element.classList.remove(lightColorsArr[index]);
        setTimeout(resetLight, 100);
      }
    }
  }
}

const blink = (element, index) => {
  element.classList.add(lightColorsArr[index]);
  let resetLight = () => element.classList.remove(lightColorsArr[index]);
  setTimeout(resetLight, 1000);
}

const blinkDisplay = () => {
  countDisplay.style.color = "#47000B";
  let resetLight = () => countDisplay.style.color = "rgb(230, 81, 104)";
  setTimeout(resetLight, 1000);
}

const flashing = (arr, element) => {
  let value = 0;
  const myInterval = setInterval(() => {
    id = arr[value];
    // console.log("Assign to id:", id);
    blink(element[id], id);
    playSound(gameSounds[id]);
    value++;
    // console.log("Value amount is:", value)
    if (value === arr.length) {
      clearInterval(myInterval);
    }
  }, 1500)
}

const playSound = (url) => {
  let audio = new Audio(url);
  audio.play();
}

// const errorSound = (url1, url2) => {
//   let audio1 = new Audio(url1);
//   audio1.play();
//   let audio2 = new Audio(url2);
//   audio2.play();
// }

const compareArrays = () => {
  if (powerOff === 0) {
    console.log("Go away, I'm sleeping...");
    return;
  }
  else if (playCount === gameLimit 
    && aiSeq.length === playerSeq.length 
    && JSON.stringify(aiSeq) === JSON.stringify(playerSeq)) {
      console.log("Winner, winner, chicken dinner!");
      return;
    }
  // else if (playCount === gameLimit) {
  //   console.log("No more games. compareArrays");
  //   return;
  // } 
  else if (aiSeq.length === playerSeq.length) {
    // const promise = new Promise((resolve, reject) => {
      if (JSON.stringify(aiSeq) === JSON.stringify(playerSeq)) {
        // playCount++;
        createSequence(aiSeq);
        flashing(aiSeq, lens);
        // resolve(console.log('They are equal!'));
      } else {
        console.log('Not equal')
        console.log("Let's try again, Simon says:", aiSeq);
        flashing(aiSeq, lens);
        // reject(console.log("Let's try again, Simon says:", aiSeq));
      }
      gamePlay();
    // });
  }

}

const resetArray = (arr) => {
  arr.length = 0;
}

const timeUp = (eval) => {
  if (eval) {
    compareArrays(aiSeq, playerSeq);
  } else {
    console.log('Ran out of time do over...');
  }
}

const startGame = () => {
  if (powerOff === 0) {
    console.log("I'm sleeping...");
    return false;
  } else {
    console.log("Starting game....")
    // var startUp = setTimeout()
    createSequence(aiSeq);
    flashing(aiSeq, lens);
    gamePlay();
  }
}


const gamePlay = () => {
  if (powerOff === 0) {
    console.log("I'm sleeping...");
    return false;
  } else if (playCount === gameLimit) {
    console.log("Game over, man!");
    return false;
  } else {
    playCount = aiSeq.length;
    countDisplay.innerHTML = aiSeq.length;
    resetArray(playerSeq);
    console.log("Simon says:", aiSeq);
    compareArrays();
    
  } 
}

const seqInput = (arr, num) => {
    return () => {
      arr.push(num);
      console.log("Player array is:", arr);
      compareArrays();
    }
}

const togglePower = () => {
  if (powerOff === 0) {
    powerButton.style.background = "linear-gradient(to right, black 50%, #1F8EE0 50%)";
    countDisplay.style.color = "rgb(230, 81, 104)";
    countDisplay.innerHTML = "- -";
    console.log("Power on");
    playCount = 0;
    powerOff = 1;

    // Initialize player input functions based on button pressed
    seqInputGreen = seqInput(playerSeq, 0);
    seqInputRed = seqInput(playerSeq, 1);
    seqInputYellow = seqInput(playerSeq, 2);
    seqInputBlue = seqInput(playerSeq, 3);
    greenLight1 = lightUp("mousedown", green, 0);
    greenLight2 = lightUp("mouseup", green, 0);
    redLight1 = lightUp("mousedown", red, 1);
    redLight2 = lightUp("mouseup", red, 1);
    yellowLight1 = lightUp("mousedown", yellow, 2);
    yellowLight2 = lightUp("mouseup", yellow, 2);
    blueLight1 = lightUp("mousedown", blue, 3);
    blueLight2 = lightUp("mouseup", blue, 3);


    green.addEventListener("click", seqInputGreen);    
    red.addEventListener("click", seqInputRed);
    yellow.addEventListener("click", seqInputYellow);
    blue.addEventListener("click", seqInputBlue);

    green.addEventListener("mousedown", greenLight1);
    green.addEventListener("mouseup", greenLight2);
    red.addEventListener("mousedown", redLight1);
    red.addEventListener("mouseup", redLight2);
    yellow.addEventListener("mousedown", yellowLight1);
    yellow.addEventListener("mouseup", yellowLight2);
    blue.addEventListener("mousedown", blueLight1);
    blue.addEventListener("mouseup", blueLight2);

    startButton.addEventListener("click", startGame);

  } else if (powerOff === 1) {
      resetArray(aiSeq);
      resetArray(playerSeq);
      playCount = 0;
      powerButton.style.background = "linear-gradient(to right, #1F8EE0 50%, black 50%)";
      countDisplay.style.color = "#47000B";
      countDisplay.innerHTML = "- -";
      console.log("Power off");
      powerOff = 0;

      green.removeEventListener("click", seqInputGreen);
      red.removeEventListener("click", seqInputRed);
      yellow.removeEventListener("click", seqInputYellow);
      blue.removeEventListener("click", seqInputBlue);

      green.removeEventListener("mousedown", greenLight1);
      green.removeEventListener("mouseup", greenLight2);
      red.removeEventListener("mousedown", redLight1);
      red.removeEventListener("mouseup", redLight2);
      yellow.removeEventListener("mousedown", yellowLight1);
      yellow.removeEventListener("mouseup", yellowLight2);
      blue.removeEventListener("mousedown", blueLight1);
      blue.removeEventListener("mouseup", blueLight2);

      startButton.removeEventListener("click", startGame);
    }
}
 
powerButton.addEventListener("click", togglePower);

