import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API endpoint
const API_URL = 'http://01.fy25ey02.64mb.io/';

// Define the type for your data (adjust these based on the actual API response)
export interface CardData {
  balance: number;
  auto_fill_date: string;
  auto_fill_amount: number;
}

// Async thunk to fetch data with a simulated delay
export const fetchCardData = createAsyncThunk<CardData>(
  'data/fetchCardData',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate production-level API integration.
      // The API is intentionally delayed by 2 seconds (if not, you can simulate by wrapping in a setTimeout)
      const response = await axios.get<CardData>(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue('Error fetching data.');
    }
  }
);

interface DataState {
  cardData: CardData | null;
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  cardData: null,
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // You can add additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCardData.fulfilled, (state, action) => {
        state.cardData = action.payload;
        state.loading = false;
      })
      .addCase(fetchCardData.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default dataSlice.reducer;
