async function fetcher(url = "", headers = {}) {
  const response = await fetch(url, headers);
  const data = await response.json();
  console.log(data);
}

document.querySelector(".next-joke")?.addEventListener("click", () => {
  fetcher("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  });
});
