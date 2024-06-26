import React, { useRef } from "react";
import downloadVideo from "../hooks/downloadVideo";
import { useSelector, useDispatch } from "react-redux";
import {
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
} from "../state/videoSlice";

function DownloadBtn({ inputRef, getVideoRef, videoProp }) {
  const downloadBtnRef = useRef(null);
  const dispatch = useDispatch();
  const { videObj, videoReady, startInput, endInput } = useSelector(
    (state) => state.video
  );

  function handleDownload() {
    dispatch(setPlaying(false));
    dispatch(setVideoLoading(true));
    dispatch(setVideoReady(false));
    dispatch(setDownloadPercent(""));
    disableHandle([downloadBtnRef, getVideoRef], true);
    localStorage.removeItem("downloadProgress");
    localStorage.removeItem("downloadCompleted");
    const maxAttempts = 20;
    let attemptCount = 0;
    let completed = false;
    let find = false;
    const interval = setInterval(() => {
      const progressDataString = localStorage.getItem("downloadProgress");
      if (progressDataString) {
        const downloadCompletedString =
          localStorage.getItem("downloadCompleted");
        const progressData = JSON.parse(progressDataString);
        dispatch(setDownloadPercent(progressData.downloadProgress));
        find = true;

        if (downloadCompletedString) {
          completed = true;
          find = false;
          clearInterval(interval);
          dispatch(setVideoLoading(false));
          dispatch(setVideoReady(true));
          dispatch(setDownloadPercent(""));
          localStorage.removeItem("downloadProgress");
          localStorage.removeItem("downloadCompleted");
          disableHandle([downloadBtnRef, getVideoRef], false);
          return;
        }
      }

      if (!completed && !find) {
        attemptCount += 1;
        if (attemptCount >= maxAttempts) {
          dispatch(setVideoLoading(false));
          dispatch(setVideoReady(true));
          dispatch(setDownloadPercent(""));
          localStorage.removeItem("downloadProgress");
          localStorage.removeItem("downloadCompleted");
          disableHandle([downloadBtnRef, getVideoRef], false);
          dispatch(setError("This is not valid url or video not fetched"));
          dispatch(setErrorDuration(3000));
          inputRef.current.value = "";
          dispatch(setVideObj({}));
          dispatch(setAllUrls([]));
          dispatch(setVideoUrl(""));
          clearInterval(interval);
        }
      }
    }, 1000);
  }

  return (
    <button
      ref={downloadBtnRef}
      className="rounded-full border-2 border-solid border-bgray-100 p-4 font-bold text-center w-full h-16 text-offwhite-200 bg-bgray-200 hover:bg-opacity-60 active:bg-opacity-50 focus:outline-none disabled:cursor-not-allowed"
      onClick={() => {
        inputRef.current.value == ""
          ? false
          : true &&
            videoReady &&
            downloadVideo(videoProp, startInput, endInput, videObj) &&
            handleDownload();
      }}
    >
      Download
    </button>
  );
}

export default DownloadBtn;
