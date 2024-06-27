import axios from "axios";
import getDownloadStatus from "./getDownloadStatus";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function downloadVideo(isCut, start = null, end = null, videObj) {
  const url = videObj.orgUrl;
  const title = videObj.title;
  const postData = {
    url: url,
    title: title,
    resolution: videObj.resolution,
    format_id: videObj.format_id,
    start_time: start,
    end_time: end,
  };

  try {
    let response;
    if (isCut) {
      response = await axios.post(`${BASE_URL}/download/clip`, postData);
    } else if (!isCut) {
      response = await axios.post(`${BASE_URL}/download/`, postData);
    }
    if (response.data.task_id) {
      await getDownloadStatus(response.data.task_id, isCut, videObj);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export default downloadVideo;
