import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import VideoFormats from "./VideoFormats";
import ReactPlayer from "react-player";
import VideoCut from "./VideoCut";
import getAllFormats from "../hooks/getAllFormats";
import getFormats from "../hooks/getFormats";
import parseUrl from "../functions/parseUrl";
import Error from "./Error";
import Loading from "./Loading";
import DownloadBtn from "./DownloadBtn";
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
} from "../state/videoSlice";

export function HandleVideo() {
  const dispatch = useDispatch();
  const { videourl, playing, error } = useSelector((state) => state.video);
  const inputRef = useRef(null);
  const videoRef = useRef(null);
  const getVideoRef = useRef(null);

  async function setVideoFormats() {
    dispatch(setPlaying(false));
    dispatch(setVideoReady(false));
    getVideoRef.current.disabled = true;
    dispatch(setError(null));
    dispatch(setVideoLoading(true));
    const url = inputRef.current.value;
    try {
      const taskId = await getAllFormats(url);
      if (taskId) {
        const raw_formats = await getFormats(taskId);
        if (raw_formats) {
          const [best_quality_video, objVideo, allArr] = await parseUrl(
            raw_formats,
            url
          );
          dispatch(setVideoUrl(best_quality_video));
          dispatch(setVideObj(objVideo));
          dispatch(setAllUrls(allArr));
        }
      }
    } catch (error) {
      handleError();
    } finally {
      getVideoRef.current.disabled = false;
      dispatch(setVideoLoading(false));
    }
  }

  function handleError() {
    dispatch(setError("This is not valid url or video not fetched"));
    dispatch(setErrorDuration(3000));
    inputRef.current.value = "";
    dispatch(setVideObj({}));
    dispatch(setAllUrls([]));
    dispatch(setVideoUrl(""));
  }

  function handleReady() {
    dispatch(setVideoLoading(false));
    dispatch(setVideoReady(true));
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
          <DownloadBtn
            inputRef={inputRef}
            getVideoRef={getVideoRef}
            videoProp={false}
          />
          <VideoFormats />
        </div>
        <div className="rounded-full flex flex-col">
          <VideoCut videoRef={videoRef} inputRef={inputRef} />
        </div>
      </div>
      <div>{error && <Error />}</div>
    </div>
  );
}

export default HandleVideo;
