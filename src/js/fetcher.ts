export async function fetcher(urls: any[] = [], headers = {}, callback) {
  const randomApi = Math.floor(Math.random() * urls.length);
  const url = urls[randomApi].url;
  const response = await fetch(url, headers);
  const data = await response.json();
  const jokeArray = urls[randomApi].data.map((jokePart) => data[jokePart]);
  callback(jokeArray);
}
