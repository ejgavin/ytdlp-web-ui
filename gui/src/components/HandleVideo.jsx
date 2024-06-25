import React, { useRef, useState } from "react";
import VideoFormats from "./VideoFormats";
import ReactPlayer from "react-player";
import VideoCut from "./VideoCut";
import downloadVideo from "../hooks/downloadVideo";
import getAllFormats from "../hooks/getAllFormats";
import Error from "./Error";
import Loading from "./Loading";
import "./../styles.css";


export function HandleVideo() {
  const inputRef = useRef(null);
  const videoRef = useRef(null);
  const downloadBtnRef = useRef(null);
  const getVideoRef = useRef(null);
  const [allUrls, setAllUrls] = useState([]);
  const [videObj, setVideObj] = useState({});
  const [videourl, setVideoUrl] = useState("");
  const [playing, setPlaying] = useState(true);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoReady, setvideoReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(null);
  const [errorDuration, setErrorDuration] = useState(3000);
  const [downloadPercent, setDownloadPercent] = useState("")


  async function setVideoFormats() {
    setPlaying(false);
    setvideoReady(false)
    disableHandle([downloadBtnRef,getVideoRef], true)
    setError(null)
    setVideoLoading(true)
    const url = inputRef.current.value;
    try {
      const videoArr = await getAllFormats(url);
      const best_quality_video = videoArr[0]
      const objVideo = videoArr[1]
      const allArr = videoArr[2]
      if (best_quality_video && objVideo && allArr) {
        setVideoUrl(best_quality_video);
        setVideObj(objVideo);
        setAllUrls(allArr);
        downloadBtnRef.current.disabled = false
      } 
    } catch (error) {
      setError("This is not valid url or video not fetched");
      setErrorDuration(3000);
      inputRef.current.value = ""
      setVideObj({})
      setAllUrls([])
      setVideoUrl("")
    }finally{
      getVideoRef.current.disabled = false
      setVideoLoading(false)
    }
  }


  function handleReady(){
    setVideoLoading(false)
    setvideoReady(true)
  }


  function disableHandle(disableArr, isDisable) {
    disableArr.forEach((item) => {
      if (item.current) {
        item.current.disabled = isDisable;
      }
    });
  }


  // Temporary Solution
  function handleDownload() {
    setPlaying(false);
    setVideoLoading(true);
    setvideoReady(false);
    setDownloadPercent("")
    disableHandle([downloadBtnRef,getVideoRef], true)
    localStorage.removeItem('downloadProgress');
    localStorage.removeItem('downloadCompleted')
    const maxAttempts = 15;
    let attemptCount = 0;
    let completed = false;
    let find = false
    const interval = setInterval(() => {
      console.log(find)
      console.log(completed)
      const progressDataString = localStorage.getItem('downloadProgress');
      if (progressDataString) {
        const downloadCompletedString = localStorage.getItem('downloadCompleted');
        const progressData = JSON.parse(progressDataString);
        setDownloadPercent(progressData.downloadProgress);
        console.log(`Video Url: ${progressData.videoUrl}, Progress: ${progressData.downloadProgress}%`);
        find = true
        

        if (downloadCompletedString) {
          completed = true;
          find = false
          clearInterval(interval);
          setVideoLoading(false);
          setvideoReady(true);
          setDownloadPercent("")
          localStorage.removeItem('downloadProgress');
          localStorage.removeItem('downloadCompleted')
          disableHandle([downloadBtnRef,getVideoRef], false)
          return;
        }
      }
  
      if (!completed && !find) {
        attemptCount += 1;
        if (attemptCount >= maxAttempts) {
          setVideoLoading(false);
          setvideoReady(true);
          setDownloadPercent("")
          localStorage.removeItem('downloadProgress');
          localStorage.removeItem('downloadCompleted')
          disableHandle([downloadBtnRef,getVideoRef], false)
          setError("This is not valid url or video not fetched");
          setErrorDuration(3000);
          inputRef.current.value = ""
          setVideObj({})
          setAllUrls([])
          setVideoUrl("")
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
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onStart={() => setVideoPlaying(true)}
              onDuration={(videoDuration) => setDuration(videoDuration)}
              onReady={handleReady}
            />
            <Loading videoLoading={videoLoading} downloadPercent={downloadPercent}/>
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
            onClick={() => {inputRef.current.value == "" ? false: true && videoReady && downloadVideo(false, null, null, videObj) && handleDownload()}}
          >
            Download
          </button>
          <VideoFormats
            allUrls={allUrls}
            setVideoUrl={setVideoUrl}
            setVideObj={setVideObj}
            setVideoLoading={setVideoLoading}
            disableHandle={disableHandle}
            videoReady={videoReady}
          />
        </div>
        <div className="rounded-full flex flex-col">
          <VideoCut
            videoRef={videoRef}
            setPlaying={setPlaying}
            downloadVideo={downloadVideo}
            videObj={videObj}
            videoPlaying={videoPlaying}
            duration={duration}
            disableHandle={disableHandle}
            videoReady={videoReady}
            setError={setError}
            setErrorDuration={setErrorDuration}
            handleDownload={handleDownload}
          />
        </div>
      </div>
      <div>
        {error && <Error error={error} duration={errorDuration} setError={setError} />}
      </div>
    </div>
  );
}

export default HandleVideo;
