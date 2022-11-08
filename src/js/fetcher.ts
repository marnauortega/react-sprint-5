export async function fetcher(url = "", headers = {}, callback) {
  const response = await fetch(url, headers);
  const data = await response.json();
  callback(data.joke);
}
