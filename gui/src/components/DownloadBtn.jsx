import React, { useRef, useEffect } from "react";
import downloadVideo from "../hooks/downloadVideo";
import { useSelector, useDispatch } from "react-redux";
import controlTime from "../functions/controlTime";
import handleDownload from "../functions/handleDownload";

function DownloadBtn({ inputRef, getVideoRef, videoProp }) {
  const downloadBtnRef = useRef(null);
  const dispatch = useDispatch();
  const { videObj, videoReady, startInput, endInput } = useSelector(
    (state) => state.video
  );

  const checkCut = () => {
    const checkTotal = parseInt(startInput) + parseInt(endInput);
    if (videoProp && checkTotal) {
      console.log(controlTime);
      return controlTime(startInput, endInput);
    } else if (videoProp == false) {
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

  return (
    <button
      ref={downloadBtnRef}
      className="rounded-full border-2 border-solid border-bgray-100 p-4 font-bold text-center w-full h-16 text-offwhite-200 bg-bgray-200 hover:bg-opacity-60 active:bg-opacity-50 focus:outline-none disabled:cursor-not-allowed"
      onClick={() => {
        if (inputRef.current.value !== "" && videoReady && checkCut()) {
          handleDownload(dispatch, downloadBtnRef, getVideoRef, inputRef);
          downloadVideo(videoProp, startInput, endInput, videObj);
        }
      }}
    >
      Download
    </button>
  );
}

export default DownloadBtn;
