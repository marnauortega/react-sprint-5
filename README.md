# Javascript I

![Javascript I](/src/assets/img/screenshot.webp)

## [Live Site](https://react-sprint-5.netlify.app/)

This is a course project consisting of:

- A joke generator which randomly fetches jokes from 3 different APIs and allows to vote them.
- A weather panel which leverages geolocation to display the current weather and temperature
- A city selector which allows to display weather data from the world's 40 most populated cities.
- An animated blob generated with WebGL through [Three.js](https://threejs.org/)
- Unit tests for the app, including an API call mock.

## Details

The exercice was good practice for working with coordinates. I had to grab the browser's coordinates and compare them against a JSON I built of the 75000 world's biggest cities. So the app can yield precise information of your weather no matter where you are!

Having locations from all biggest cities made it easy to build the city selector. Now you can pick any major city and get its weather:

![City selector](/src/assets/img/city-selector.gif)

## Available Scripts

```
npm run dev
```

It runs the site on development mode and sets a local server at http://localhost:1234 to visit the site.

```
npm run build
```

It generates all assets for deployment in the `dist` folder.
