import React, { useRef } from "react";
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
    if (videoProp) {
      return controlTime(startInput, endInput);
    } else {
      return true;
    }
  };

  return (
    <button
      ref={downloadBtnRef}
      className="rounded-full border-2 border-solid border-bgray-100 p-4 font-bold text-center w-full h-16 text-offwhite-200 bg-bgray-200 hover:bg-opacity-60 active:bg-opacity-50 focus:outline-none disabled:cursor-not-allowed"
      onClick={() => {
        inputRef.current.value == ""
          ? false
          : true &&
            videoReady &&
            checkCut &&
            downloadVideo(videoProp, startInput, endInput, videObj) &&
            handleDownload(dispatch, downloadBtnRef, getVideoRef, inputRef);
      }}
    >
      Download
    </button>
  );
}

export default DownloadBtn;
