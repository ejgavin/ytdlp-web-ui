from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from app.ytdlp import Ytdlp
from app.fileop.fileop import FileOp
from app.control.control import Control
from app.schema import Url, DownloadRequest
from redis_worker import task_queue ,redis_conn
from rq.job import Job
import json
from os.path import getsize

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)


@app.get("/")
async def get_page():
    return {"message": "Hoşgeldin"}


@app.post("/formats")
async def get_all_format(url: Url):
    search_query_url = Control.is_youtube_search_query_url(url.url
    )
    empty_url = (url.url == '')
    valid_url = Control.is_url(url.url)
    playlist_url = Control.is_playlist_url(url.url)
    if search_query_url or empty_url or playlist_url or not valid_url:
        return {
            "message": "This is not a valid URL"
        }
    try:
        all_video_url = task_queue.enqueue(Ytdlp.get_all_formats_url, url.url)
        return {"message": "successful", "task_id": all_video_url.id}
    except Exception as e:
        return {"message": f"An error occurred: {str(e)}"}


@app.post("/download")
async def download(data: DownloadRequest):
    try:
        video = task_queue.enqueue(Ytdlp.download_video ,data.url, data.title, data.resolution, data.format_id)
        return {"message": "successful", "task_id": video.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/download/clip")
async def download(data: DownloadRequest):
    try:
        video = task_queue.enqueue(Ytdlp.dowload_clip ,data.url, data.title, data.resolution, data.format_id, data.start_time, data.end_time)
        return {"message": "successful", "task_id": video.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/formats/{task_id}")
async def get_all_formats(task_id: str):
    try:
        job = await get_status(task_id)
        job_json = json.loads(job["result"])
        return job_json
    except:
        raise HTTPException(status_code=404, detail="Formats not found")

@app.get("/download/{video_id}/")
async def get_video(video_id: str, cut: bool = False):
    if cut:
        cut_video_id = video_id + "/cut"
        video_path, video_name = FileOp.find_largest_file(cut_video_id)
    else:
        video_path, video_name = FileOp.find_largest_file(video_id)

    if video_path:
        content_length = getsize(video_path)
        headers = {'Content-Disposition': f'attachment; filename="{video_name}"', 'Content-Length': str(content_length)}
        return FileResponse(path=video_path, filename=video_name, headers=headers, media_type='application/octet-stream')
    else:
        raise HTTPException(status_code=404, detail="File not found")
    
@app.get("/status/{task_id}")
async def get_status(task_id: str):
    try:
        job = Job.fetch(task_id, connection=redis_conn)
        return {"id": job.id, "status": job.get_status(), "result": job.result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

