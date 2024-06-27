from pydantic import BaseModel
from typing import Optional


class Url(BaseModel):
    url: str

class DownloadRequest(BaseModel):
    url: str
    title: str
    resolution: Optional[str] = None
    format_id: Optional[str] = None
    start_time: Optional[float] = None
    end_time: Optional[float] = None
