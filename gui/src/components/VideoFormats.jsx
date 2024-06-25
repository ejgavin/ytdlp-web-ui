import React, { useRef, useEffect } from "react";

function VideoFormats({ allUrls, setVideoUrl, setVideObj, setVideoLoading, disableHandle, videoReady  }) {
  const selectRef = useRef(null);
  const audioSelectRef = useRef(null);

  function optionsToUrl(type) {
    setVideoLoading(true)
    const selectedFormatId = selectRef.current.value;
    const audioSelectRefFormatId = audioSelectRef.current.value;
    let optObj;
    if (type == "video") {
      optObj = allUrls.find((element) => element.format_id == selectedFormatId);
    } else if (type == "audio") {
      optObj = allUrls.find(
        (element) => element.format_id == audioSelectRefFormatId
      );
    }

    if (!optObj) {
      console.error("Selected format not found in allUrls");
      return;
    }

    if (optObj.audio_ext === "none") {
      const manifestUrl = optObj.manifest_url
        ? optObj.manifest_url
        : optObj.url;

      setVideoUrl(manifestUrl);
      setVideObj(optObj);
    } else {
      setVideoUrl(optObj.url);
      setVideObj(optObj);
    }
  }

  function getOptions(type) {
    return allUrls.map((element) => {
      const { format, format_id, filesize, video_ext } = element;

      const filesizeInMB =
        filesize !== undefined
          ? (filesize / 1048576).toFixed(2) + " MB"
          : "Unknown";

      if (type == "video" && video_ext !== "none") {
        return (
          <option
            key={format_id}
            value={format_id}
            className="bg-bgray-100 text-offwhite-200"
          >
            {`${format} ${filesizeInMB}`}
          </option>
        );
      } else if (type == "audio" && video_ext == "none") {
        return (
          <option
            key={format_id}
            value={format_id}
            className="bg-bgray-100 text-offwhite-200"
          >
            {`${format} ${filesizeInMB}`}
          </option>
        );
      }
    });
  }



  useEffect(() => {
    if(videoReady){
      disableHandle([selectRef,audioSelectRef], false)
    }else if(videoReady == false){
      disableHandle([selectRef,audioSelectRef], true)
    }

  }, [videoReady]);




  return (
    <div className="flex flex-row gap-2 justify-center md:w-160 w-80">
      <div className="flex flex-col md:w-80 w-40">
        <label htmlFor="video-format" className="text-offwhite-200">
          Video Format
        </label>
        <select
          ref={selectRef}
          onChange={() => optionsToUrl("video")}
          className="border-2 border-bgray-100 bg-bgray-200 rounded-sm focus:outline-none focus:outline-offwhite-200 select:outline-none select:outline-offwhite-200 disabled:cursor-not-allowed"
          id="video-format"
          name="video-format"
          required
          size="4"
        >
          <option
            value="select"
            className="bg-bgray-100 text-offwhite-200 active:bg-bgray-150"
          >
            Select a video format
          </option>
          {getOptions("video")}
        </select>
      </div>
      <div className="flex flex-col md:w-80 w-40">
        <label htmlFor="audio-format" className="text-offwhite-200">
          Audio Format
        </label>
        <select
          ref={audioSelectRef}
          onChange={() => optionsToUrl("audio")}
          className="border-2 border-bgray-100 bg-bgray-200 rounded-sm focus:outline-none focus:outline-offwhite-200 select:outline-none select:outline-offwhite-200 disabled:cursor-not-allowed"
          id="audio-format"
          name="audio-format"
          required
          size="4"
        >
          <option
            value="select"
            className="bg-bgray-100 text-offwhite-200 active:bg-bgray-150 checked:border-none"
          >
            Select a audio format
          </option>
          {getOptions("audio")}
        </select>
      </div>
    </div>
  );
}

export default VideoFormats;
