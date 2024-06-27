import axios from "axios";
import getFormatStatus from "./getFormatsStatus";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function getAllFormats(url) {
  const postData = { url: url };
  try {
    const response = await axios.post(`${BASE_URL}/formats`, postData);
    if (response.data.task_id) {
      const status = await getFormatStatus(response.data.task_id);
      if (status) {
        return response.data.task_id;
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export default getAllFormats;
