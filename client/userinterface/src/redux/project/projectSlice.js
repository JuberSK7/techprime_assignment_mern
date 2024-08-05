import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BaseUrl = "http://localhost:5000";

export const GetProject = createAsyncThunk(
  'project/getProject',
  async ({ query, page, field }, { rejectWithValue }) => {
    console.log('q', query, 'p-', page, 'f-', field)
    try {
      const response = await fetch(`${BaseUrl}/project/project?search=${query}&page=${page}&sort=${field}:asc`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.projects.length > 0) {
        return data;
      } else {
        return rejectWithValue(data.error);
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const GetProjectInfo = createAsyncThunk(
  'project/getProjectInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BaseUrl}/project/projectinfo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const GetDashboardChart = createAsyncThunk(
  'project/getDashboardChart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BaseUrl}/project/dashboardchart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const UpdateProject = createAsyncThunk(
  'project/updateProject',
  async (url, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BaseUrl}/project${url}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data ? true : false;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const ProjectCreateData = createAsyncThunk(
  'project/createData',
  async (formdata, { rejectWithValue }) => {
    console.log('form data', formdata)
    try {
      const response = await fetch(`${BaseUrl}/project/project/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await response.json();
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    data: [],
    loading: false,
    totalPage: 1,
    error: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetProject.pending, (state) => {
        state.loading = true;
        state.message = "...Loading";
        state.error = false;
      })
      .addCase(GetProject.fulfilled, (state, action) => {
        state.data = action.payload.projects;
        state.totalPage = action.payload.pagination.pageCount;
        state.loading = false;
        state.error = false;
        state.message = action.payload.message;
      })
      .addCase(GetProject.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = "Invalid Project Details!";
      })
      .addCase(GetProjectInfo.fulfilled, (state, action) => {
        state.projectInfo = action.payload; 
      })
      .addCase(GetDashboardChart.fulfilled, (state, action) => {
        state.dashboardChart = action.payload; 
      })
      .addCase(UpdateProject.fulfilled, (state, action) => {
        state.updateSuccess = action.payload; 
      })
      .addCase(ProjectCreateData.fulfilled, (state, action) => {
        state.createData = action.payload; 
        state.message = "Project Created Successfully!";
      });
  },
});

export default projectSlice.reducer;
