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
    "https://cinema-api-test.y-media.io/v1/movieShows",
    {
      agent: httpsAgent,
      params: { ...query },
    }
  );

  let result: any = JSON.parse(response).data;

  Object.keys(result).forEach((key) => {
    result[key].forEach((data) => {
      data.daytime = data.daytime.split(";");
    });
  });

  const allMovies = await $fetch("/api/movies", {
    agent: httpsAgent,
  });

  Object.keys(result).forEach((key) => {
    const movie = allMovies.find((movie) => movie.id == key);

    result[key] = {
      id: key,
      name: movie.name,
      shows: { ...result[key] },
    };
  });

  return result;
});
