import React, { useEffect, useRef, useState } from "react";
import { FaBackward } from "react-icons/fa";
import {
  IoChevronBack,
  IoChevronForwardSharp,
  IoPlayForward,
} from "react-icons/io5";
import Error from "./Error";

function VideoCut({
  videoRef,
  setPlaying,
  downloadVideo,
  videObj,
  videoPlaying,
  duration,
  disableHandle,
  videoReady,
  handleDownload
}) {
  const inputRef = useRef(null);
  const startInputRef = useRef(null);
  const endInputRef = useRef(null);
  const backwardRef = useRef(null);
  const smBackwardRef = useRef(null);
  const smForwardRef = useRef(null);
  const forwardRef = useRef(null);
  const downloadClipBtn = useRef(null);
  const prewievBtn = useRef(null);
  const startBtn = useRef(null);
  const endBtn = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState(null);
  const [errorDuration, setErrorDuration] = useState(3000);

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && videoPlaying) {
        const currentTime = videoRef.current.getCurrentTime();
        setCurrentTime(currentTime);
        inputRef.current.value = currentTime.toFixed(2);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [videoRef, videoPlaying]);

  useEffect(() => {
    if(videoReady){
      disableHandle([backwardRef,smBackwardRef,smForwardRef,forwardRef,downloadClipBtn,prewievBtn, startBtn, endBtn], false)
    }else if(videoReady == false){
      disableHandle([backwardRef,smBackwardRef,smForwardRef,forwardRef,downloadClipBtn,prewievBtn, startBtn, endBtn], true)
    }

  }, [videoReady]);

  function handleCurrent(e) {
    if (e.target.dataset.ref === "start") {
      startInputRef.current.value = inputRef.current.value;
    } else if (e.target.dataset.ref === "end") {
      endInputRef.current.value = inputRef.current.value;
    }
  }

  function backwardForwardOperations(e) {
    const seekTo = (sec) => videoRef.current.seekTo(sec);
    const seekAmount =
      e.target.dataset.backforw === "sm-back"
        ? -1
        : e.target.dataset.backforw === "back"
        ? -5
        : e.target.dataset.backforw === "sm-forw"
        ? 1
        : e.target.dataset.backforw === "forw"
        ? 5
        : 0;
    seekTo(currentTime + seekAmount);
  }


  function cutVideoPreview() {
    if (
      startInputRef.current.value &&
      endInputRef.current.value &&
      controlTime()
    ) {
      const seekTo = (sec) => videoRef.current.seekTo(sec);
      const stopTime =
        (endInputRef.current.value - startInputRef.current.value) * 1000;
      const stopFunc = () => setPlaying(false);
      seekTo(startInputRef.current.value);
      setPlaying(true);
      setTimeout(stopFunc, stopTime);
    }
  }

  function controlTime() {
    if (
      endInputRef.current.value < startInputRef.current.value ||
      parseFloat(endInputRef.current.value) == parseFloat(startInputRef.current.value)
    ) {
      setError("the end second cannot be less than or equal to the start second")
      setErrorDuration(3000)
      return false;
    } else {
      return true;
    }
  }

  return (
    <div className="flex flex-col mt-14 md:w-160 w-80">
      <div className="flex items-center gap-2 text-center w-full">
        <button
          ref={backwardRef}
          className="flex justify-center items-center rounded-full text-offwhite-200 border-2 border-solid border-bgray-100 bg-bgray-200 w-16 h-16 hover:bg-opacity-60 active:bg-opacity-50  focus:outline-none disabled:cursor-not-allowed"
          data-backforw="back"
          onClick={backwardForwardOperations}
        >
          <FaBackward className="self-center" />
        </button>
        <button
          ref={smBackwardRef}
          className="flex justify-center items-center rounded-full text-offwhite-200 border-2 border-solid border-bgray-100 bg-bgray-200 w-16 h-16 hover:bg-opacity-60 active:bg-opacity-50  focus:outline-none disabled:cursor-not-allowed"
          data-backforw="sm-back"
          onClick={backwardForwardOperations}
        >
          <IoChevronBack className="self-center" />
        </button>
        <input
          ref={inputRef}
          className="rounded-full font-bold text-center text-offwhite-200 bg-bgray-200 border-2 border-solid border-bgray-100 w-full h-16 placeholder:text-bgray-150 focus:outline-none focus:outline-offwhite-200 select:outline-none select:outline-offwhite-200"
          placeholder="Current Time"
          type="text"
          readOnly
        />
        <button
          ref={smForwardRef}
          className="flex justify-center items-center rounded-full text-offwhite-200 border-2 border-solid border-bgray-100 bg-bgray-200 w-16 h-16 hover:bg-opacity-60 active:bg-opacity-50  focus:outline-none disabled:cursor-not-allowed"
          data-backforw="sm-forw"
          onClick={backwardForwardOperations}
        >
          <IoChevronForwardSharp />
        </button>
        <button
          ref={forwardRef}
          className="flex justify-center items-center rounded-full text-offwhite-200 border-2 border-solid border-bgray-100 bg-bgray-200 w-16 h-16 hover:bg-opacity-60 active:bg-opacity-50  focus:outline-none disabled:cursor-not-allowed"
          data-backforw="forw"
          onClick={backwardForwardOperations}
        >
          <IoPlayForward />
        </button>
      </div>
      <div className="flex gap-4 mt-5">
        <button
          ref={startBtn}
          className="rounded-full text-offwhite-200 border-2 border-solid border-bgray-100 bg-bgray-200 w-full h-16  font-bold hover:bg-opacity-60 active:bg-opacity-50  focus:outline-none disabled:cursor-not-allowed"
          data-ref="start"
          onClick={handleCurrent}
        >
          Start
        </button>
        <button
          ref={endBtn}
          className="rounded-full text-offwhite-200 border-2 border-solid border-bgray-100 bg-bgray-200 w-full h-16 font-bold hover:bg-opacity-60 active:bg-opacity-50  focus:outline-none disabled:cursor-not-allowed"
          data-ref="end"
          onClick={handleCurrent}
        >
          End
        </button>
      </div>
      <div className="flex gap-4 mt-5">
        <input
          type="number"
          placeholder="Start Sec"
          className="rounded-full text-center font-bold text-offwhite-200 bg-bgray-200 w-full h-16 font-boldborder-2 border-solid border-bgray-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  placeholder:text-bgray-150 focus:outline-none focus:outline-offwhite-200 select:outline-none select:outline-offwhite-200"
          min={0}
          max={duration}
          ref={startInputRef}
        />
        <input
          type="number"
          placeholder="End Sec"
          className="rounded-full text-center w-full h-16 bg-bgray-200 text-offwhite-200 font-bold border-2 border-solid border-bgray-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  placeholder:text-bgray-150 focus:outline-none focus:outline-offwhite-200 select:outline-none select:outline-offwhite-200"
          min={0}
          max={duration}
          ref={endInputRef}
        />
      </div>
      <div className="flex flex-col gap-5 mt-5">
        <button
          ref={prewievBtn}
          className="rounded-full text-offwhite-200 border-2 border-solid border-bgray-100 bg-bgray-200 w-full h-16 font-bold hover:bg-opacity-60 active:bg-opacity-50  focus:outline-none disabled:cursor-not-allowed"
          onClick={cutVideoPreview}
        >
          Preview
        </button>
        <button
          ref={downloadClipBtn}
          className="rounded-full text-offwhite-200 border-2 border-solid border-bgray-100 bg-bgray-200 w-full h-16 font-bold hover:bg-opacity-60 active:bg-opacity-50  focus:outline-none disabled:cursor-not-allowed"
          onClick={() =>
            inputRef.current.value == "" ? false: true && videoReady && controlTime() &&
            downloadVideo(
              true,
              startInputRef.current.value,
              endInputRef.current.value,
              videObj
            )
            && handleDownload() 
          }
        >
          Download Clip
        </button>
      </div>
      <div>
        {error && <Error error={error} duration={errorDuration} setError={setError} />}
      </div>
    </div>
  );
}

export default VideoCut;
