import axios from "axios";

export const translateText = async (text) => {
    const options = {
      method: "POST",
      url: "https://deep-translate1.p.rapidapi.com/language/translate/v2",
      headers: {
        "x-rapidapi-key": "2c319d3103msh1390d1fcb76c01ep105b1bjsn65e39beb8989",
        "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        q: text,
        source: "en",
        target: "pl",
      },
    };
    try {
      const response = await axios.request(options);
      return response.data.data.translations.translatedText;
    } catch (error) {
      console.error(error);
      return text;
    }
  };