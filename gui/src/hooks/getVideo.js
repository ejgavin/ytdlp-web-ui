import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;



async function getVideo(videoId, isCut, videObj) {
  let video_url;
  if (isCut) {
    video_url = `${BASE_URL}/download/${videoId}/?cut=True`;
  } else if (!isCut) {
    video_url = `${BASE_URL}/download/${videoId}/`;
  }
  try {
    const headers = {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    }
    const response = await axios.get(video_url, {
      responseType: "blob",
      headers: headers,
      onDownloadProgress: (progressEvent) => {
        console.log(progressEvent)
        const total = progressEvent.total;
        const loaded = progressEvent.loaded;
        let percentCompleted = Math.round((loaded * 100) / total);
        const progressData = {
          videoUrl: videObj.orgUrl,
          downloadProgress: percentCompleted
        };
        localStorage.setItem('downloadProgress', JSON.stringify(progressData));
      }
    });


    const contentDisposition = response.headers["content-disposition"];
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(contentDisposition);
    let filename = matches && matches[1] ? matches[1].replace(/['"]/g, '') : `${videObj.title}.${videObj.ext}`; 
    console.log(decodeURIComponent(filename));
    const name = decodeURIComponent(filename);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log("Aşşağıda bulunan fonksiyon çalışıcak")
    const progressData = {
      videoUrl: videObj.url,
      downloadProgress: "completed"
    };
    localStorage.setItem('downloadCompleted', JSON.stringify(progressData));
  } catch (error) {
    console.error("Error:", error);
  }
}

export default getVideo;
