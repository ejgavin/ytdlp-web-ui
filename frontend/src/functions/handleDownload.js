import disableHandle from "./disableHandle";
import {
  setPlaying,
  setVideoLoading,
  setVideoReady,
  setDownloadPercent,
  setError,
  setErrorDuration,
  setVideObj,
  setAllUrls,
  setVideoUrl,
} from "../state/videoSlice";

function handleDownload(dispatch, downloadBtnRef, getVideoRef, inputRef) {
  const maxAttempts = 20;
  let attemptCount = 0;
  let completed = false;
  let find = false;

  dispatch(setPlaying(false));
  dispatch(setVideoLoading(true));
  dispatch(setVideoReady(false));
  dispatch(setDownloadPercent(""));
  disableHandle([downloadBtnRef, getVideoRef], true);

  localStorage.removeItem("downloadProgress");
  localStorage.removeItem("downloadCompleted");

  const handleInterval = () => {
    const progressDataString = localStorage.getItem("downloadProgress");

    if (progressDataString) {
      const downloadCompletedString = localStorage.getItem("downloadCompleted");
      const progressData = JSON.parse(progressDataString);
      dispatch(setDownloadPercent(progressData.downloadProgress));
      find = true;

      if (downloadCompletedString) {
        completed = true;
        find = false;
        clearInterval(interval);
        handleDownloadComplete(dispatch, downloadBtnRef, getVideoRef);
        return;
      }
    }

    if (!completed && !find) {
      attemptCount += 1;
      if (attemptCount >= maxAttempts) {
        handleDownloadError(
          dispatch,
          downloadBtnRef,
          getVideoRef,
          inputRef,
          interval
        );
      }
    }
  };

  const interval = setInterval(handleInterval, 1000);
}

function handleDownloadComplete(dispatch, downloadBtnRef, getVideoRef) {
  dispatch(setVideoLoading(false));
  dispatch(setVideoReady(true));
  dispatch(setDownloadPercent(""));
  localStorage.removeItem("downloadProgress");
  localStorage.removeItem("downloadCompleted");
  disableHandle([downloadBtnRef, getVideoRef], false);
}

function handleDownloadError(
  dispatch,
  downloadBtnRef,
  getVideoRef,
  inputRef,
  interval
) {
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

export default handleDownload;
