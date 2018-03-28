var aiSeq = [],
 playerSeq = [],
 level = 0,
 powerOff = 0,
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
  return new Promise (resolve => {
    arr.push(randomNumGenerator());
    console.log("Random generated array is:", arr);
  });
  // (reject => {console.log("I'm afraid I can't do that.")});
}

const seqInput = (arr, index) => {
  if (powerOff === 0) {
    lens[index].removeEventListener("click", seqInput(arr, index));
  }
  
 else {
      // new Promise (resolve => {
      //   console.log("The index is:", index);
      //   arr.push(index);
      //   console.log("The array is:", arr);
      // });
      // (reject => {console.log("I won't do that!")});
      return () => {
        const promise = new Promise((resolve, reject) => {
          resolve(arr.push(index));
          // reject(console.log("I won't do that!"));
        });
      }

  }
}

const lightUp = (event, element, index) => {
  return () => {
    var lightColorsArr = ["liteGreen", "liteRed", "liteYell", "liteBlue"];
    if (powerOff === 0) {
      element.removeEventListener(event, lightUp(event, element, index));
    } else {
      if (event === "mousedown") {
        element.classList.add(lightColorsArr[index]);
      } else if (event === "mouseup") {
        setTimeout(element.classList.remove(lightColorsArr[index]), 6000);
      }
    }
  }
}



const compareArrays = (arr1, arr2) => {
  const promise = new Promise((resolve, reject) => {
    if (JSON.stringify(arr1) === JSON.stringify(arr2)) {
      resolve(console.log('They are equal!'));
    } else {
      reject(console.log('Not equal'));
    }
  });
  // const promise = new Promise((resolve, reject) => {
  //   if (true) {
  //     resolve('Stuff Worked');
  //   } else {
  //     reject("Error, it doesn't work.")
  //   }
  // })
}

const resetArray = (arr) => {
  arr.length = 0;
}

const timer = () => {
  // return new Promise(resolve => {
    setTimeout(() => {
      console.log("Time's up!");
      return true;
    }
      , 6000);
  // })
}

const timeUp = (eval) => {
  if (eval) {
    compareArrays(aiSeq, playerSeq);
  } else {
    console.log('Ran out of time do over...');
  }
}

const startGame = () => {
  console.log("Starting game....")
  createSequence(aiSeq);
}

const togglePower = () => {
  if (powerOff === 0) {
    powerButton.style.background = "linear-gradient(to right, black 50%, #1F8EE0 50%)";
    countDisplay.style.color = "rgb(230, 81, 104)";
    countDisplay.innerHTML = "00";
    console.log("Power on");
    powerOff = 1;

    for (let i = 0; i < lens.length; i++) {
      lens[i].addEventListener("click", seqInput(playerSeq, i));
      lens[i].addEventListener("mousedown", lightUp("mousedown", lens[i], i));
      lens[i].addEventListener("mouseup", lightUp("mouseup", lens[i], i));
    }

    startButton.addEventListener("click", startGame);

  } else if (powerOff === 1) {
    resetArray(aiSeq);
    resetArray(playerSeq);
    powerButton.style.background = "linear-gradient(to right, #1F8EE0 50%, black 50%)";
    countDisplay.style.color = "#47000B";
    countDisplay.innerHTML = "- -";
    console.log("Power off");
    powerOff = 0;

    startButton.removeEventListener("click", startGame);
  }

}
 

powerButton.addEventListener("click", togglePower);

