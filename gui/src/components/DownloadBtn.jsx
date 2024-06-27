import React, { useRef, useEffect } from "react";
import downloadVideo from "../hooks/downloadVideo";
import { useSelector, useDispatch } from "react-redux";
import controlTime from "../functions/controlTime";
import handleDownload from "../functions/handleDownload";
import { setError } from "../state/videoSlice";

function DownloadBtn({ inputRef, getVideoRef, videoProp }) {
  const downloadBtnRef = useRef(null);
  const dispatch = useDispatch();
  const { videObj, videoReady, startInput, endInput } = useSelector(
    (state) => state.video
  );

  const checkCut = () => {
    const start = parseInt(startInput);
    const end = parseInt(endInput);
    const checkTotal = start + end;

    if (checkTotal && controlTime(start, end)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (videoReady) {
      downloadBtnRef.current.disabled = false;
    } else {
      downloadBtnRef.current.disabled = true;
    }
  }, [videoReady]);

  function handleButtonClick() {
    if (inputRef.current.value !== "" && videoReady) {
      if (!videoProp) {
        handleDownload(dispatch, downloadBtnRef, getVideoRef, inputRef);
        downloadVideo(videoProp, null, null, videObj);
      } else if (videoProp && checkCut()) {
        handleDownload(dispatch, downloadBtnRef, getVideoRef, inputRef);
        downloadVideo(videoProp, startInput, endInput, videObj);
      } else {
        setError("Video not fetched or not valid time");
      }
    }
  }

  return (
    <button
      ref={downloadBtnRef}
      className="rounded-full border-2 border-solid border-bgray-100 p-4 font-bold text-center w-full h-16 text-offwhite-200 bg-bgray-200 hover:bg-opacity-60 active:bg-opacity-50 focus:outline-none disabled:cursor-not-allowed"
      onClick={handleButtonClick}
    >
      Download
    </button>
  );
}

export default DownloadBtn;
