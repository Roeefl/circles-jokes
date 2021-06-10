import { uniqBy } from 'lodash';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchJokes } from './jokesAPI';

const initialState = {
  isLoading: false,
  jokes: [],
  blacklistedJokeIds: [],
};

export const fetchJokesAsync = createAsyncThunk(
  'jokes/fetchJokesAsync',
  async () => {
    const jokes = await fetchJokes();
    return { jokes };
  }
);

export const jokesSlice = createSlice({
  name: 'jokes',
  initialState,
  reducers: {
    flipJoke: (state, { payload: jokeId }) => {
      const jokeIndex = state.jokes.findIndex(({ id }) => id === jokeId);
      if (!jokeIndex && jokeIndex !== 0) return;

      state.jokes[jokeIndex].isVisible = !state.jokes[jokeIndex].isVisible;
    },
    blacklistJoke: (state, { payload: jokeId }) => {
      state.blacklistedJokeIds = [
        ...state.blacklistedJokeIds,
        jokeId,
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJokesAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchJokesAsync.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        const visibleJokes = state.jokes.filter(joke => joke.isVisible);

        const { jokes = [] } = payload;
        const addedJokes = jokes.map(joke => ({
          ...joke,
          isVisible: false,
        }));

        const combinedJokes = [
          ...visibleJokes,
          addedJokes,
        ]
          .flat()
          .filter(joke => !state.blacklistedJokeIds.includes(joke.id));

        state.jokes = uniqBy(
          combinedJokes,
          (joke) => joke.id
        );
      });
  },
});

export const { flipJoke, blacklistJoke } = jokesSlice.actions;

export const selectJokes = (state) => state.jokes.jokes;

export default jokesSlice.reducer;
