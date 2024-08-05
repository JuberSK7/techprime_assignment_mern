import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BaseUrl = "http://localhost:5000";

export const login = createAsyncThunk(
  'auth/login',
  async (creds, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BaseUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      });
      const data = await response.json();
      if (!data.error) {
        return data;
      } else {
        return rejectWithValue(data.error);
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);


export const authlogout = createAsyncThunk('auth/logout', async () => {

  return "Logout Successful!";
});

let token = localStorage.getItem("user");

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: !!token,
    token: token,
    data: [],
    loading: false,
    error: false,
    message: "",
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = true;
        state.token = action.payload.token;
        state.loading = false;
        state.error = false;
        state.message = "Login Successful";
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuth = false;
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
    
      .addCase(authlogout.fulfilled, (state, action) => {
        state.isAuth = false;
        state.token = "";
        state.message = action.payload;
        localStorage.removeItem('user');
      });
  },
});

export default authSlice.reducer;
