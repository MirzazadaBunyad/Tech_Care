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

export const fetchLabResults = createAsyncThunk(
  "data/fetchLabResults",
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}`, {
      headers,
    });
    return response.data[3]?.lab_results;
  }
);

export const fetchProfile = createAsyncThunk("data/fetchProfile", async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}`, {
    headers,
  });
  return response.data[3];
});

export const fetchDiagnosticList = createAsyncThunk(
  "data/fetchDiagnosticList",
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}`, {
      headers,
    });
    return response.data[3].diagnostic_list;
  }
);
