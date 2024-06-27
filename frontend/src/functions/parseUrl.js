function parseUrl(arr, url) {
  const title = arr.title;
  const newarr = arr.all_video_url.filter(
    (element) => element.format_note !== "storyboard"
  );
  const allVideoArr = newarr.map((element) => ({
    title: title,
    orgUrl: url,
    format: element.format,
    format_id: element.format_id,
    format_note: element.format_note,
    resolution: element.resolution,
    url: element.url,
    manifest_url: element.manifest_url,
    protocol: element.protocol,
    filesize: element.filesize,
    ext: element.ext,
    audio_ext: element.audio_ext,
    video_ext: element.video_ext,
  }));
  const objVideo = allVideoArr.find(
    (vid) => vid.url === arr.best_quality_video
  );
  return [arr.best_quality_video, objVideo, allVideoArr];
}

export default parseUrl;
