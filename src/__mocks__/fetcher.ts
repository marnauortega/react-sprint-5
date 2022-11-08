export async function fetcher(url = "", headers = {}, callback) {
  const data = await Promise.resolve({
    joke: "A man walks into a bar and orders helicopter flavor chips. The barman replies “sorry mate we only do plain",
  });
  callback(data.joke);
}
