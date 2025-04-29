import axios from "axios";

export async function searchWeb(query) {
  const searchApiKey = process.env.SEARCH_API_KEY;
  
  const response = await axios.get("https://api.bing.microsoft.com/v7.0/search", {
    headers: {
      "Ocp-Apim-Subscription-Key": searchApiKey,
    },
    params: { q: query },
  });

  return response.data;
}