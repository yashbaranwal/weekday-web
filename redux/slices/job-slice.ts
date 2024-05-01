import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  filteredJobs: [],
  selectedRoles: []
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
    }

  },
});

export const {
  setJobs,
  setSelectedRoles,
} = JobSlice.actions;

export default JobSlice.reducer;
