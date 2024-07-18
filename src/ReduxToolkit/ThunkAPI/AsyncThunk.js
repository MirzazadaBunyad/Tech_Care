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
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching diagnostic history", error);
      throw error;
    }
  }
);

export const fetchPatients = createAsyncThunk(
  "data/fetchPatients",
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}`, {
      headers,
    });
    return response.data;
  }
);
