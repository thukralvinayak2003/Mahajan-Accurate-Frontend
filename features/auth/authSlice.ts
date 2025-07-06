// features/auth/authSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "../../types";
import API from "../../utils/api";
import {
  clearTokens,
  getRefreshToken,
  saveTokens,
} from "../../utils/authStorage";

const initialState: AuthState = {
  user: null,
  loading: false,
};

// Thunks
export const login = createAsyncThunk(
  "auth/login",
  async (
    { phoneNumber, password }: { phoneNumber: string; password: string },
    thunkAPI
  ) => {
    const res = await API.post("auth/login", { phoneNumber, password });
    const { user, tokens } = res.data.data;
    await saveTokens(tokens);
    return user;
  }
);

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, thunkAPI) => {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token");

    const res = await API.post("auth/refresh-token", { refreshToken });
    const { tokens } = res.data.data;
    await saveTokens(tokens);
  }
);

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    await thunkAPI.dispatch(refreshAccessToken() as any); // ensure fresh token
    const res = await API.get("auth/me");
    return res.data.data.user;
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const refreshToken = await getRefreshToken();
  try {
    if (refreshToken) {
      await API.post("/auth/logout", { refreshToken });
    }
  } catch (e) {
    console.error("Logout failed");
  } finally {
    await clearTokens();
    return null;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
