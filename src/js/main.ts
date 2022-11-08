import { fetcher } from "./fetcher";

/* ==========================
        FETCH JOKES
===========================*/

const url = "https://icanhazdadjoke.com/";
const headers = {
  headers: {
    Accept: "application/json",
  },
};
const jokeParagraph = document.querySelector(".joke");

document.querySelector(".next-joke")?.addEventListener("click", () => {
  fetcher(url, headers, insertJoke);
});

let jokeShown = false;

function insertJoke(joke) {
  jokeParagraph!.innerHTML = joke;
  jokeRated = false;
  if (jokeShown === false) {
    createRatingHandlers();
    jokeShown = true;
  }
}

/* ==========================
        RATE JOKES
===========================*/

// To allow only one vote per joke
let jokeRated = false;

const ratingBtns = document.querySelectorAll(".rating");

function createRatingHandlers() {
  ratingBtns.forEach((btn) => btn.addEventListener("click", rateJoke));
}

function rateJoke() {
  if (!jokeRated) {
    const joke = document.querySelector(".joke")?.innerHTML;
    const score = parseInt(this.id);
    addJoke(joke, score);
    jokeRated = true;
  }
}

type jokeScoreType = {
  joke: string;
  scoresArray: number[];
  score: number;
  date: string;
};

const jokeRatings: jokeScoreType[] = [];

function addJoke(joke, score) {
  // Check if joke is already in array
  const jokeTitles = jokeRatings.map((object) => object.joke);
  const index = jokeTitles.findIndex((element) => element === joke);
  if (index >= 0) {
    const selectedJoke = jokeRatings[index];
    // Add another score to score-array and calculate avg (round to nearest of 1,2,3)
    selectedJoke.scoresArray = selectedJoke.scoresArray.concat(score);
    const arraySum = selectedJoke.scoresArray.reduce((acc, curr) => acc + curr);
    const arrayAvg = arraySum / selectedJoke.scoresArray.length;
    selectedJoke.score = Math.round(arrayAvg);
  } else {
    // Add joke to array
    const jokeScore = {} as jokeScoreType;

    jokeScore.joke = joke;
    jokeScore.scoresArray = [score];
    jokeScore.score = score;
    jokeScore.date = new Date().toISOString();
    jokeRatings.push(jokeScore);
  }
}

export { jokeParagraph, insertJoke, jokeRatings, addJoke, rateJoke };
