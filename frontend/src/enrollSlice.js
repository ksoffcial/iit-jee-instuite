import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axiosClient from "./utils/axisoClient";


export const enrolmentDetails = createAsyncThunk(
    'get/course',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get("/enroll/studentEnrollment", { withCredentials: true })
            return response.data.data
        }
        catch (err) {
            return rejectWithValue(err.response?.data?.data?.message || err.message)
        }
    }

)

const enrollSlice = createSlice({
    name: "enroll",
    initialState: {
        enrolledCourses: [],
        enrolledCourseIds: [],
        isPaidUser: false,
        loading: false,
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(enrolmentDetails.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(enrolmentDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.enrolledCourses = action.payload;
                state.enrolledCourseIds = action.payload.map(
                    (item) => item?.courseId._id
                );
                state.isPaidUser = action.payload?.length > 0;
                state.user = action.payload;
            })
            .addCase(enrolmentDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'something went wrong ';
                state.isPaidUser = false;
                state.enrolledCourses = null;
                state.enrolledCourseIds = null;
            })
    }
})


export default enrollSlice.reducer