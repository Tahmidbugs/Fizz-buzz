let element = document.getElementById("num");
let username = document.getElementById("username");
const btn = document.getElementById("btn");
const btn2 = document.getElementById("btn2");

//get the username from url.
let str = window.location.search;
const namestr = str.substring(str.indexOf("=") + 1);
us = namestr.substring(0, namestr.indexOf("password") - 1);

id = namestr;

username.innerHTML = us;
url = "http://basic-web.dev.avc.web.usf.edu/" + id;
let value = 0;

function myPlay(soundeffect) {
  var audio = new Audio(soundeffect);
  audio.volume = 0.3;
  audio.play();
}

// calls get function to retrieve whether or not data exists on that username
get(url).then(function (response) {
  if (response.status == 200) {
    const username = response.data.id;
    const score = response.data.score;
    console.log("get function active");
    console.log(username);
    console.log(score);
    value = score;
    displayScore(score);
  } else {
    post(url, { score: 0 }); //create a new user
    console.log("New user created");
  }
});

//the provided GET function
function get(url) {
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();
    http.onload = function () {
      resolve({ status: http.status, data: JSON.parse(http.response) });
    };
    http.open("GET", url);
    http.send();
  });
}

//the provided post function
function post(url, data) {
  data = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();
    http.onload = function () {
      resolve({ status: http.status, data: JSON.parse(http.response) });
      console.log(http.status);
      console.log(http.response);
    };
    http.open("POST", url);
    http.setRequestHeader("Content-Type", "application/json");
    http.send(data);
  });
}

// display score displays user's score
function displayScore(value) {
  if (!value) {
    element.innerHTML = 0;
    element.style.backgroundColor = "#7dd7dd";
  } else if (!(value % 15)) {
    element.innerHTML = "FizzBuzz";
    element.style.backgroundColor = "#F2E333";
    myPlay("soundeffects/fizzbuzz.mp3");
  } else if (!(value % 5)) {
    element.innerHTML = "Buzz";
    element.style.backgroundColor = "indianred";
    myPlay("soundeffects/buzz.mp3");
  } else if (!(value % 3)) {
    element.innerHTML = "Fizz";
    element.style.backgroundColor = "#85DD9E";
    myPlay("soundeffects/fizz.mp3");
  } else {
    element.innerHTML = value;
    element.style.backgroundColor = "#59cbd3";
    myPlay("soundeffects/tap.mp3");
  }
}

// when user presses 'click to increment', display score is called and the score is updated using post
btn.addEventListener("click", function () {
  value += 1;
  displayScore(value);
  const dataToSend = { score: value };

  post(url, dataToSend).then(function (response) {
    switch (
      response.status //checking
    ) {
      case 200 || 201:
        const score = response.data.score;
        console.log("case 200 post function active");
        console.log(score);
        break;
      case 400:
        console.error(response.data);
        break;
      case 500:
        console.error(response.data);
        break;
    }
  });
});

// when user presses 'reset', display score is called to display '0' and the score is updated using post
btn2.addEventListener("click", function () {
  myPlay("soundeffects/reset.mp3");
  value = 0;
  displayScore(value);
  const dataToSend = { score: value };

  post(url, dataToSend).then(function (response) {
    switch (
      response.status //checking
    ) {
      case 200 || 201:
        const score = response.data.score;
        console.log("case 200 post function active");
        console.log(score);
        break;
      case 400:
        console.error(response.data);
        break;
      case 500:
        console.error(response.data);
        break;
    }
  });
});
