import axios from "axios";
import getVideo from "./getVideo";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


async function getStatus(task_id, isCut, videObj) {
  const checkStatus = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/status/${task_id}`
      );
      if (response.data.status === "finished") {
        getVideo(response.data.result, isCut, videObj);
        return true;
      } else if (response.data.status === "failed") {
        console.error("Video not fetched")
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  let statusChecked = false;
  while (!statusChecked) {
    statusChecked = await checkStatus();
    if (!statusChecked) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
}

export default getStatus;
