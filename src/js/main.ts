async function fetcher(url = "", headers = {}, callback) {
  const response = await fetch(url, headers);
  const data = await response.json();
  console.log(data.joke);
  callback(data.joke);
}

const url = "https://icanhazdadjoke.com/";
const headers = {
  headers: {
    Accept: "application/json",
  },
};
const jokeParagraph = document.querySelector(".joke");

function insertJoke(joke) {
  jokeParagraph!.innerHTML = joke;
}

document.querySelector(".next-joke")?.addEventListener("click", () => {
  fetcher(url, headers, insertJoke);
});
