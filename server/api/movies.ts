// const axios = require("axios");
// const https = require("https");

// const fetch = require("node-fetch");
import https from "https";

const movieGenres = {
  0: "ACTION",
  1: "ADVENTURE",
  2: "COMEDY",
  3: "DRAMA",
  4: "HORROR",
  5: "WESTERN",
};

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export default defineEventHandler(async (event) => {
  const query = useQuery(event);

  const response: any = await $fetch(
    "https://cinema-api-test.y-media.io/v1/movies",
    {
      agent: httpsAgent,
      params: { ...query },
    }
  );

  let result: any = JSON.parse(response).data;
  result.forEach((movie) => {
    // movie.genre = movieGenres[movie.genre];
    movie.genre = { [movie.genre]: movieGenres[movie.genre] };
  });
  return result;
  // JSON.parse(data.value).data
});
