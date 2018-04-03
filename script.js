var aiSeq = [],
 playerSeq = [],
 level = 0,
 playCount,
 gameLimit = 20,
 powerOff = 0,
 duration = 2000,
 lens = document.getElementsByClassName('lens'),
 green = document.getElementById('green'),
 red = document.getElementById('red'),
 yellow = document.getElementById('yellow'),
 blue = document.getElementById('blue'),
 brutalIndicator = document.getElementById('brutal-indicator'),
 brutalMode = 0,
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
      arr.push(randomNumGenerator());
      console.log("Random generated array is:", arr);
    }
}

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

const displayMessage = (message) => {
  countDisplay.style.color = "#47000B";
  let resetLight = () => {
    countDisplay.innerHTML = message;
    countDisplay.style.color = "rgb(230, 81, 104)";
  }
  setTimeout(resetLight, 400);
}


const gameWon = () => {
  displayMessage("WIN!");
  for (let i = 0; i < lens.length; i++) {
    // lens[i].classList.add('blink-lens');
    blink(lens[i], i);
    playSound(gameSounds[i]);
  }

}

const flashing = (arr, element) => {
  let value = 0;
  const myInterval = setInterval(() => {
    countDisplay.innerHTML = aiSeq.length;
    id = arr[value];
    blink(element[id], id);
    playSound(gameSounds[id]);
    value++;
    if (value === arr.length) {
      clearInterval(myInterval);
    }
  }, duration)
}

const playSound = (url) => {
  let audio = new Audio(url);
  audio.play();
}

const compareArrays = () => {
  if (powerOff === 0) {
    console.log("Go away, I'm sleeping...");
    return;
  } else if (playCount === gameLimit 
    && aiSeq.length === playerSeq.length 
    && JSON.stringify(aiSeq) === JSON.stringify(playerSeq)) {
      console.log("Winner, winner, chicken dinner!");
      gameWon();
      return;
    } else if (aiSeq.length === playerSeq.length) {
      if (JSON.stringify(aiSeq) === JSON.stringify(playerSeq)) {
        createSequence(aiSeq);
        flashing(aiSeq, lens, 3000);
      } else {
        if (brutalMode === 1) {
          resetArray(aiSeq);
          console.log('Crap!')
          console.log("Sorry dude, Simon says starting from the beginning...", aiSeq);
          displayMessage("Err");
          flashing(aiSeq, lens, 1000);
        } else {
          console.log('Not equal')
          console.log("Let's try again, Simon says:", aiSeq);
          displayMessage("Err");
          flashing(aiSeq, lens, 2000);
        }
      }
      gamePlay();
  }
}

const resetArray = (arr) => {
  arr.length = 0;
  // for (let i = 0; i < lens.length; i++) {
  //   lens[i].classList.remove('blink-lens');
  // }
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

    // Speed the game pace as the player goes further along
    switch (true) {
      case playCount === 5:
        duration -= 300;
        break;
      case playCount === 9:
        duration -= 600;
        break;
      case playCount === 13:
        duration -= 900;
        break;
      default:
        duration;
    }
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

const toggleBrutalMode = () => {
  if (brutalMode === 0) {
    console.log("Switching to brutal mode...");
    brutalIndicator.style.backgroundColor = "red";
    brutalMode = 1;
  } else if (brutalMode === 1) {
    console.log("Whew! Deactivate brutal mode.");
    brutalIndicator.style.backgroundColor = "black";
    brutalMode = 0;
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
    brutalButton.addEventListener("click", toggleBrutalMode);

  } else if (powerOff === 1) {
      resetArray(aiSeq);
      resetArray(playerSeq);
      playCount = 0;
      brutalMode = 0;
      powerButton.style.background = "linear-gradient(to right, #1F8EE0 50%, black 50%)";
      countDisplay.style.color = "#47000B";
      countDisplay.innerHTML = "- -";
      console.log("Power off");
      powerOff = 0;

      // Remove event listeners from each unique ID
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
      brutalButton.removeEventListener("click", toggleBrutalMode);
    }
}
 
powerButton.addEventListener("click", togglePower);

