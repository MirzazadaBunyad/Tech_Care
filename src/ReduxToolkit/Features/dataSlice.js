import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDiagnosticHistory,
} from "../ThunkAPI/AsyncThunk";

const initialState = {
  diagnosticHistory: {
    fetchedData: null,
    error: null,
    clickedSystolicValue: null,
    clickedDiastolicValue: null,
    systolicLevels: [],
    diastolicLevels: [],
    respiratoryRateValue: null,
    respiratoryRateLevels: [],
    temperatureValue: null,
    temperatureLevels: [],
    heartRateValue: null,
    heartRateLevels: [],
  },
  selectedPatient: null,
  patients: {
    fetchedData: null,
    error: null,
  },
  labResults: {
    fetchedData: null,
    error: null,
  },
  profile: {
    fetchedData: null,
    error: null,
  },
  diagnostics: {
    fetchedData: null,
    error: null,
  },
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setSelectedPatient(state, action) {
      state.selectedPatient = action.payload;
    },
    setClickedSystolicValue: (state, action) => {
      state.diagnosticHistory.clickedSystolicValue = action.payload;
    },
    setClickedDiastolicValue: (state, action) => {
      state.diagnosticHistory.clickedDiastolicValue = action.payload;
    },
    setSystolicLevels: (state, action) => {
      state.diagnosticHistory.systolicLevels = action.payload;
    },
    setDiastolicLevels: (state, action) => {
      state.diagnosticHistory.diastolicLevels = action.payload;
    },
    setRespiratoryRateValue: (state, action) => {
      state.diagnosticHistory.respiratoryRateValue = action.payload;
    },
    setRespiratoryRateLevels: (state, action) => {
      state.diagnosticHistory.respiratoryRateLevels = action.payload;
    },
    setTemperatureValue: (state, action) => {
      state.diagnosticHistory.temperatureValue = action.payload;
    },
    setTemperatureLevels: (state, action) => {
      state.diagnosticHistory.temperatureLevels = action.payload;
    },
    setHeartRateValue: (state, action) => {
      state.diagnosticHistory.heartRateValue = action.payload;
    },
    setHeartRateLevels: (state, action) => {
      state.diagnosticHistory.heartRateLevels = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiagnosticHistory.pending, (state) => {
        state.diagnosticHistory.error = null;
      })
      .addCase(fetchDiagnosticHistory.fulfilled, (state, action) => {
        state.diagnosticHistory.fetchedData = action.payload;
      })
      .addCase(fetchDiagnosticHistory.rejected, (state, action) => {
        state.diagnosticHistory.error = action.error;
      });
  },
});

export const {
  setClickedSystolicValue,
  setClickedDiastolicValue,
  setSystolicLevels,
  setDiastolicLevels,
  setRespiratoryRateValue,
  setRespiratoryRateLevels,
  setTemperatureValue,
  setTemperatureLevels,
  setHeartRateValue,
  setHeartRateLevels,
  setSelectedPatient,
} = dataSlice.actions;

export default dataSlice.reducer;
