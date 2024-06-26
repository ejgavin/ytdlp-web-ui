import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function getFormats(task_id) {
  try {
    const response = await axios.get(`${BASE_URL}/formats/${task_id}`);
    return response.data;
  } catch (error) {
    console.error(response.data.detail);
  }
}

export default getFormats;
