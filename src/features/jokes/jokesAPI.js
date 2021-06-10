import axios from 'axios';

const apiURL = 'https://official-joke-api.appspot.com';

export async function fetchJokes() {
  const url = `${apiURL}/jokes/programming/ten`;

  try {
    const { data: jokes = [] } = await axios.get(url);
    return jokes;
  } catch (err) {
    console.error(err);
  }
}
