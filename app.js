const duringGameHeadings = [
  "Hmmm is that your number?",
  "Is that your number?",
  "What about this?",
  "What do you think?",
  "Is this the final decision?",
  "What's your take on this?",
  "Do you have any other options?",
  "Is there anything I'm missing?",
  "Do you have any other insights?",
  "Am i getting close?",
];

const winningHeading = [
  "Thank me later !",
  "Faster than fast, quicker than quick, that's your number !",
  "Ka-Chow, Here is your number !",
];

var firstGuess = false;
var hasLied = false;
var left = -1e18;
var right = 1e18;
var mid = 0;
var guessesAfterLying = 0;
var numberOfGuessesSoFar = 0;

function initializeBoundaries(userNumber) {
  const RandomAmoutLeft = Math.floor(
    Math.random() * Math.floor(Math.random() * 100000000)
  );
  const RandomAmouRight = Math.floor(
    Math.random() * Math.floor(Math.random() * 100000000)
  );
  left = userNumber - RandomAmoutLeft;
  right = userNumber + RandomAmouRight;
}

function getRandomWinningHeading() {
  const index = Math.floor(Math.random() * winningHeading.length);
  return winningHeading[index];
}

function showHeading() {
  const heading = document.getElementById("gameHeading");
  if (!firstGuess) {
    heading.textContent = duringGameHeadings[0];
    firstGuess |= 1;
  } else {
    const textIndex = Math.floor(Math.random() * duringGameHeadings.length);
    heading.textContent = duringGameHeadings[textIndex];
  }
}

function showGameContent() {
  document.getElementById("Home").style.display = "none";
  document.getElementById("Game").style.display = "flex";
}

function showNumber() {
  mid = Math.floor(left + (right - left) / 2);
  document.getElementById("gen-Number").textContent = mid.toLocaleString();
}

function check(UserNumber, mode = false, Heading = "Thank me later !") {
  if (mid === UserNumber || mode) {
    document.getElementById("gameHeading").textContent = Heading;
    const toHide = document.getElementsByClassName("controls");
    for (var i = 0; i < toHide.length; i++) {
      toHide[i].style.display = "none";
    }
    document.getElementById("btn-another-guess").style.display = "flex";
  }
}

function Reset() {
  firstGuess = false;
  hasLied = false;
  mid = 0;
  left = -1e18;
  right = 1e18;
  guessesAfterLying = 0;
  numberOfGuessesSoFar = 0;

  document.getElementById("Home").style.display = "flex";
  document.getElementById("number").value = "0";
  document.getElementById("Game").style.display = "none";

  const toHide = document.getElementsByClassName("controls");
  for (var i = 0; i < toHide.length; i++) {
    toHide[i].style.display = "block";
  }

  document.getElementById("btn-another-guess").style.display = "none";
}

function handleImgClick() {
  document.getElementById("git").addEventListener("click", function () {
    window.location.href = "https://github.com/MostafaFouad0";
  });
  document.getElementById("linkedin").addEventListener("click", function () {
    window.location.href =
      "https://www.linkedin.com/in/mostafa-fouad-425a44259";
  });
}

function App() {
  handleImgClick();
  var UserNumber;
  document.getElementById("btn").addEventListener("click", function () {
    UserNumber = parseInt(document.getElementById("number").value);
    showGameContent();
    showHeading();
    initializeBoundaries(UserNumber);
    showNumber();
  });

  document.getElementById("btn-higher").addEventListener("click", function () {
    left = mid + 1;
    if (UserNumber <= mid) {
      hasLied |= 1;
    }
    guessesAfterLying += hasLied;
    if (guessesAfterLying === 8) {
      check(0, true, `you miss clicked ${guessesAfterLying} guesses ago!`);
    } else {
      numberOfGuessesSoFar += !hasLied;
      showHeading();
      showNumber();
      check(UserNumber, false, getRandomWinningHeading());
    }
  });
  document.getElementById("btn-lower").addEventListener("click", function () {
    right = mid - 1;
    if (UserNumber >= mid) {
      hasLied |= 1;
    }
    guessesAfterLying += hasLied;
    if (guessesAfterLying === 8) {
      check(0, true, `you miss clicked ${guessesAfterLying} guesses ago!`);
    } else {
      numberOfGuessesSoFar += !hasLied;
      showHeading();
      showNumber();
      check(UserNumber, false, getRandomWinningHeading());
    }
  });
  document
    .getElementById("btn-another-guess")
    .addEventListener("click", function () {
      Reset();
    });
}

App();
