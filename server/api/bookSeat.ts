import https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export default defineEventHandler(async (event) => {
  const body = await useBody(event);

  const response: any = await $fetch(
    "https://cinema-api-test.y-media.io/v1/bookPlace",
    {
      agent: httpsAgent,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    }
  );

  let result: any = JSON.parse(response).data;
  return result;
});
