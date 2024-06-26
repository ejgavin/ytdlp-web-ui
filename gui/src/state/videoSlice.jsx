import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUrls: [],
  videObj: {},
  videourl: "",
  playing: true,
  videoPlaying: false,
  videoLoading: false,
  videoReady: false,
  duration: 0,
  error: null,
  errorDuration: 3000,
  downloadPercent: "",
  currentTime: 0,
  startInput: 0,
  endInput: 0,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setAllUrls: (state, action) => {
      state.allUrls = action.payload;
    },
    setVideObj: (state, action) => {
      state.videObj = action.payload;
    },
    setVideoUrl: (state, action) => {
      state.videourl = action.payload;
    },
    setPlaying: (state, action) => {
      state.playing = action.payload;
    },
    setVideoPlaying: (state, action) => {
      state.videoPlaying = action.payload;
    },
    setVideoLoading: (state, action) => {
      state.videoLoading = action.payload;
    },
    setVideoReady: (state, action) => {
      state.videoReady = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setErrorDuration: (state, action) => {
      state.errorDuration = action.payload;
    },
    setDownloadPercent: (state, action) => {
      state.downloadPercent = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setStartInput: (state, action) => {
      state.startInput = action.payload;
    },
    setEndInput: (state, action) => {
      state.endInput = action.payload;
    },
  },
});

export const {
  setAllUrls,
  setVideObj,
  setVideoUrl,
  setPlaying,
  setVideoPlaying,
  setVideoLoading,
  setVideoReady,
  setDuration,
  setError,
  setErrorDuration,
  setDownloadPercent,
  setCurrentTime,
  setStartInput,
  setEndInput,
} = videoSlice.actions;

export default videoSlice.reducer;
