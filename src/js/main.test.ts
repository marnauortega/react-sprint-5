jest.mock("./fetcher");

import { fetcher } from "./fetcher";
import { /*sum,*/ insertJoke, jokeParagraph, rateJoke, jokeRatings, addJoke } from "./main";

describe("Function insertJoke", () => {
  it("insertJoke should be called when fetcher is called", () => {
    fetcher("", {}, insertJoke);
    expect(jokeParagraph?.innerHTML).toBe(undefined);
  });
});

describe("Function rateJoke", () => {
  it("rateJoke should push to JokeRatings", () => {
    addJoke("hello", 1);
    expect(jokeRatings[jokeRatings.length - 1].joke).toBe("hello");
    expect(jokeRatings[jokeRatings.length - 1].score).toBe(1);
  });
  it("addJoke should do average of several scores of same joke", () => {
    addJoke("hello, this is a joke", 1);
    addJoke("hello, this is a joke", 3);
    expect(jokeRatings[jokeRatings.length - 1].score).toBe(2);
  });
});
