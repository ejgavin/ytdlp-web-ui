import axios from "axios";
import parseUrl from "../functions/parseUrl"
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


async function getFormats(task_id, url){
    try {
        const response = await axios.get(
            `${BASE_URL}/formats/${task_id}`,
        );
        const [best_quality_video, objVideo, allArr] = await parseUrl(response.data, url)
        return [best_quality_video, objVideo, allArr]
      } catch (error) {
        console.error("Error:", error);
      }
}

export default getFormats