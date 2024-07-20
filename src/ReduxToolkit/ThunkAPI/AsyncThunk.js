import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const auth = btoa(
  `${import.meta.env.VITE_APP_USER}:${import.meta.env.VITE_APP_PASS}`
);
const headers = {
  Authorization: `Basic ${auth}`,
};

export const fetchDiagnosticHistory = createAsyncThunk(
  "data/fetchDiagnosticHistory",
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}`, {
      headers,
    });
    return response.data;
  }
);
