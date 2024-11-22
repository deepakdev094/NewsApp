
const API_URL = `https://newsapi.org/v2/everything?q=apple&from=2024-11-19&to=2024-11-19&sortBy=popularity&apiKey=${process.env.API_KEY}`;

export const fetchHeadlines = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.articles; // Assuming the data contains an 'articles' property
  } catch (error) {
    // Return an empty array or handle as needed
    return [];
  }
};