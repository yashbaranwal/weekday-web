import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  filteredJobs: [],
  selectedRoles: [],
  selectedLocations: [],
  selectedModes: []
};

const JobSlice = createSlice({
  name: "jobSlice",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      const jobs = action.payload || []; 
      state.jobs = jobs;
      state.filteredJobs = jobs; // Set filtered jobs initially to all jobs
    },
    setSelectedRoles: (state, action) => {
      state.selectedRoles = action.payload;

      const selectedRoles = state.selectedRoles.map(role => role.value); 
      state.filteredJobs = state.jobs.filter(job => selectedRoles.every(role => job.jobRole.includes(role)));
    },
    setSelectedLocations: (state, action) => {
      state.selectedLocations = action.payload;

      const selectedLocations = state.selectedLocations.map(ele => ele.value); 
      state.filteredJobs = state.jobs.filter(job => selectedLocations.every(location => job.location.includes(location)));
    },
    setSelectedModes: (state, action) => {
      state.selectedModes = action.payload;

      const selectedModes = state.selectedModes.map(ele => ele.value); 
      state.filteredJobs = state.jobs.filter(job => selectedModes.every(mode => job.location.includes(mode)));
    },

  },
});

export const {
  setJobs,
  setSelectedRoles,
  setSelectedLocations,
  setSelectedModes,
} = JobSlice.actions;

export const selectJobs = (state) => state.job.jobs
export const selectFilteredJobs = (state) => state.job.filteredJobs
export const selectRoles = (state) => state.job.selectedRoles
export const selectLocations = (state) => state.job.selectedLocations
export const selectModes = (state) => state.job.selectedModes


export default JobSlice.reducer;
