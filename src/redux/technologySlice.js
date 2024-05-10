import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTechnologies, addTechnology, updateTechnology, deleteTechnology } from '../services/technologyService';

export const getTechnologies = createAsyncThunk('technology/getTechnologies', async () => {
  return await fetchTechnologies();
});

export const createTechnology = createAsyncThunk('technology/createTechnology', async (data) => {
  return await addTechnology(data);
});

export const modifyTechnology = createAsyncThunk('technology/modifyTechnology', async ({ id, data }) => {
  return await updateTechnology(id, data);
});

export const removeTechnology = createAsyncThunk('technology/removeTechnology', async (id) => {
  return await deleteTechnology(id);
});

const technologySlice = createSlice({
  name: 'technology',
  initialState: { items: [], status: null },
  extraReducers: {
	[getTechnologies.fulfilled]: (state, action) => {
	  state.items = action.payload;
	},
	[createTechnology.fulfilled]: (state, action) => {
	  state.items.push(action.payload);
	},
	[modifyTechnology.fulfilled]: (state, action) => {
	  const index = state.items.findIndex(item => item.id === action.payload.id);
	  if (index !== -1) {
		state.items[index] = action.payload;
	  }
	},
	[removeTechnology.fulfilled]: (state, action) => {
	  state.items = state.items.filter(item => item.id !== action.payload);
	},
  }
});

export default technologySlice.reducer;
