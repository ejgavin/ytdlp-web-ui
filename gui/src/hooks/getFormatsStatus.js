import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


async function getFormatStatus(task_id) {
  const checkStatus = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/status/${task_id}`
      );
      if (response.data.status === "finished") {
        return true;
      } else if (response.data.status === "failed") {
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
    }else{
      return statusChecked
    }
  }
}

export default getFormatStatus;
