import axios from "axios";

const searchApiKey = process.env.SEARCH_API_KEY;

export default async function handler(req, res) {
  const query = req.query.q;

  try {
    const response = await axios.get(`https://api.bing.microsoft.com/v7.0/search`, {
      headers: {
        "Ocp-Apim-Subscription-Key": searchApiKey,
      },
      params: {
        q: query,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}