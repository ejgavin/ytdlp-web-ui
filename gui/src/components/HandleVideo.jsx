import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import VideoFormats from "./VideoFormats";
import ReactPlayer from "react-player";
import VideoCut from "./VideoCut";
import downloadVideo from "../hooks/downloadVideo";
import getAllFormats from "../hooks/getAllFormats";
import Error from "./Error";
import Loading from "./Loading";
import disableHandle from "../functions/disableHandle";
import "./../styles.css";

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

export function HandleVideo() {
  const dispatch = useDispatch();
  const {
    videObj,
    videourl,
    playing,
    videoLoading,
    videoReady,
    error,
    downloadPercent,
  } = useSelector((state) => state.video);

  const inputRef = useRef(null);
  const videoRef = useRef(null);
  const downloadBtnRef = useRef(null);
  const getVideoRef = useRef(null);

  async function setVideoFormats() {
    dispatch(setPlaying(false));
    dispatch(setVideoReady(false));
    disableHandle([downloadBtnRef, getVideoRef], true);
    dispatch(setError(null));
    dispatch(setVideoLoading(true));
    const url = inputRef.current.value;
    try {
      const videoArr = await getAllFormats(url);
      const best_quality_video = videoArr[0];
      const objVideo = videoArr[1];
      const allArr = videoArr[2];
      if (best_quality_video && objVideo && allArr) {
        dispatch(setVideoUrl(best_quality_video));
        dispatch(setVideObj(objVideo));
        dispatch(setAllUrls(allArr));
        downloadBtnRef.current.disabled = false;
      }
    } catch (error) {
      dispatch(setError("This is not valid url or video not fetched"));
      dispatch(setErrorDuration(3000));
      inputRef.current.value = "";
      dispatch(setVideObj({}));
      dispatch(setAllUrls([]));
      dispatch(setVideoUrl(""));
    } finally {
      getVideoRef.current.disabled = false;
      dispatch(setVideoLoading(false));
    }
  }

  function handleReady() {
    dispatch(setVideoLoading(false));
    dispatch(setVideoReady(true));
  }

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
    <div>
      <div className="flex flex-col xl:flex-row align-middle justify-around items-center">
        <div className="rounded-full flex flex-col gap-5 mt-10 md:w-160 w-80">
          <div className="relative">
            <ReactPlayer
              ref={videoRef}
              url={videourl}
              controls={true}
              playing={playing}
              width={"a"}
              height={"a"}
              className="relative md:w-160 md:h-80 w-80 h-40"
              onPlay={() => dispatch(setPlaying(true))}
              onPause={() => dispatch(setPlaying(false))}
              onStart={() => dispatch(setVideoPlaying(true))}
              onDuration={(videoDuration) =>
                dispatch(setDuration(videoDuration))
              }
              onReady={handleReady}
            />
            <Loading />
          </div>
          <input
            ref={inputRef}
            className="rounded-full font-bold p-2 text-center text-offwhite-200 bg-bgray-200 border-2 border-bgray-100 w-full h-16  placeholder:text-bgray-150  focus:outline-none focus:outline-offwhite-200 select:outline-none select:outline-offwhite-200"
            type="text"
            name="url"
            id="url"
            placeholder="Enter Video URL"
          />
          <button
            ref={getVideoRef}
            className="rounded-full border-2 border-solid border-bgray-100 p-4 font-bold text-center w-full h-16 text-offwhite-200 bg-bgray-200 hover:bg-opacity-60 active:bg-opacity-50 focus:outline-none disabled:cursor-not-allowed"
            onClick={setVideoFormats}
          >
            Get Video
          </button>
          <button
            ref={downloadBtnRef}
            className="rounded-full border-2 border-solid border-bgray-100 p-4 font-bold text-center w-full h-16 text-offwhite-200 bg-bgray-200 hover:bg-opacity-60 active:bg-opacity-50 focus:outline-none disabled:cursor-not-allowed"
            onClick={() => {
              inputRef.current.value == ""
                ? false
                : true &&
                  videoReady &&
                  downloadVideo(false, null, null, videObj) &&
                  handleDownload();
            }}
          >
            Download
          </button>
          <VideoFormats />
        </div>
        <div className="rounded-full flex flex-col">
          <VideoCut
            videoRef={videoRef}
            disableHandle={disableHandle}
            handleDownload={handleDownload}
          />
        </div>
      </div>
      <div>{error && <Error />}</div>
    </div>
  );
}

export default HandleVideo;
