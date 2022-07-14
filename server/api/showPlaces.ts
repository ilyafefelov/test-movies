import https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export default defineEventHandler(async (event) => {
  const query = useQuery(event);

  const response: any = await $fetch(
    "https://cinema-api-test.y-media.io/v1/showPlaces",
    {
      agent: httpsAgent,
      params: { ...query },
    }
  );

  let result: any = JSON.parse(response).data;

  return result;
});
