import yt_dlp
import uuid
from app.fileop.fileop import FileOp
import json

class Ytdlp:
    @staticmethod
    def get_all_formats_url(url):
        ydl_opts = {
            'format': 'best',
            'noplaylist': True,
        }

        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info_dict = ydl.extract_info(url, download=False)
                best_quality_url = info_dict.get('url', None)
                formats = info_dict.get('formats', [])
                title = info_dict.get('title', 'Unknown Title')
                video_data = {"all_video_url": formats, "best_quality_video": best_quality_url, "title": title}
                return json.dumps(video_data, indent=4)
        except Exception as e:
            return {"error": str(e)}

    @staticmethod
    def download_video(url, title, resolution, format_id):
        if resolution == "audio only":
            format = format_id
        else:
            format = format_id + '+bestaudio'
        unique_foldername = f"{uuid.uuid4()}"
        print(format)
        ydl_opts = {
            'format': format,
            'outtmpl': f'video/{unique_foldername}/%(id)s.%(ext)s',
            'writedescription': True,
            'writeinfojson': True,
            'writeannotations': True,
            'writesubtitles': True,
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
        
        return unique_foldername
    
    @staticmethod
    def dowload_clip(url, title, resolution, format_id, start_sec, end_sec):
        unique_foldername = Ytdlp.download_video(url,title,resolution,format_id)
        video_path, video_name = FileOp.find_largest_file(unique_foldername)
        cut_video_folder = FileOp.cut_video(video_path, start_sec, end_sec)
        return unique_foldername