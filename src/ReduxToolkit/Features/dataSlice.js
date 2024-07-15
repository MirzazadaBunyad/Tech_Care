import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const auth = btoa(`coalition:skills-test`);
const headers = {
  Authorization: `Basic ${auth}`,
};

// Async Thunks
export const fetchDiagnosticHistory = createAsyncThunk(
  "data/fetchDiagnosticHistory",
  async () => {
    try {
      const response = await axios.get(
        "https://fedskillstest.coalitiontechnologies.workers.dev",
        { headers }
      );
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
    const response = await axios.get(
      "https://fedskillstest.coalitiontechnologies.workers.dev",
      { headers }
    );
    return response.data;
  }
);

export const fetchLabResults = createAsyncThunk(
  "data/fetchLabResults",
  async () => {
    const response = await axios.get(
      "https://fedskillstest.coalitiontechnologies.workers.dev",
      { headers }
    );
    return response.data[3]?.lab_results;
  }
);

export const fetchProfile = createAsyncThunk("data/fetchProfile", async () => {
  const response = await axios.get(
    "https://fedskillstest.coalitiontechnologies.workers.dev",
    { headers }
  );
  return response.data[3];
});

export const fetchDiagnosticList = createAsyncThunk(
  "data/fetchDiagnosticList",
  async () => {
    const response = await axios.get(
      "https://fedskillstest.coalitiontechnologies.workers.dev",
      { headers }
    );
    return response.data[3].diagnostic_list;
  }
);

export const selectPatient = createAction("data/selectPatient", (payload) => ({
  payload,
}));

const dataSlice = createSlice({
  name: "data",
  initialState: {
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
  },
  reducers: {
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
    setSelectedPatient: (state, action) => {
      state.patients.selectedPatient = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Diagnostic History
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

    // Patients
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.patients.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.patients.fetchedData = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.patients.error = action.error;
      });

    // Lab Results
    builder
      .addCase(fetchLabResults.pending, (state) => {
        state.labResults.error = null;
      })
      .addCase(fetchLabResults.fulfilled, (state, action) => {
        state.labResults.fetchedData = action.payload;
      })
      .addCase(fetchLabResults.rejected, (state, action) => {
        state.labResults.error = action.error;
      });

    // Profile
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.profile.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile.fetchedData = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.profile.error = action.error;
      });

    // Diagnostics
    builder
      .addCase(fetchDiagnosticList.pending, (state) => {
        state.diagnostics.error = null;
      })
      .addCase(fetchDiagnosticList.fulfilled, (state, action) => {
        state.diagnostics.fetchedData = action.payload;
      })
      .addCase(fetchDiagnosticList.rejected, (state, action) => {
        state.diagnostics.error = action.error;
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
