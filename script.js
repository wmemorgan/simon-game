var aiSeq = [],
 playerSeq = [],
 level = 0,
 playCount = 0;
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
    arr.push(3);
    console.log("Random generated array is:", arr);
    return resolve;
  });
  // (reject => {console.log("I'm afraid I can't do that.")});
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



const compareArrays = () => {
  const promise = new Promise((resolve, reject) => {
    if (JSON.stringify(aiSeq) === JSON.stringify(playerSeq)) {
      playCount++;
      resolve(console.log('They are equal!'));
    } else {
      reject(console.log('Not equal'));
      resetArray(playerSeq);
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

// const timer = () => {
  // // return new Promise(resolve => {
  //   setTimeout(() => {
  //     console.log("Time's up!");
  //     return true;
  //   }
  //     , 6000);
  // // })
// }

const timeUp = (eval) => {
  if (eval) {
    compareArrays(aiSeq, playerSeq);
  } else {
    console.log('Ran out of time do over...');
  }
}

// createSequence(aiSeq).prototype.timer = function (t) {
//   return this.then(function (v) {
//     return delay(t, v);
//   });
// }
var myVar;

function myFunction() {
  myVar = setTimeout(compareArrays, 6000);
}

const startGame = () => {
  console.log("Starting game....")
  createSequence(aiSeq);
  timer = setTimeout(compareArrays, 6000);

}

const seqInput = (arr, num) => {
    return () => {
      arr.push(num);
      console.log("Player array is:", arr);
    }
}

const togglePower = () => {
  if (powerOff === 0) {
    powerButton.style.background = "linear-gradient(to right, black 50%, #1F8EE0 50%)";
    countDisplay.style.color = "rgb(230, 81, 104)";
    countDisplay.innerHTML = "00";
    console.log("Power on");
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

