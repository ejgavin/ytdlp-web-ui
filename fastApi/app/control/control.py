import re

class Control:
    def __init__(self, url):
        self.url = url

    @staticmethod
    def is_youtube_search_query_url(url):
        youtube_search_regex = re.compile(
            r'(https?://)?(www\.)?youtube\.com/results\?search_query=[^&]+')
        return bool(youtube_search_regex.match(url))
    

    @staticmethod
    def is_url(url):
        url_regex = re.compile(
            r'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)'
        )
        return bool(url_regex.match(url))



    @staticmethod
    def is_playlist_url(url):
        url_regex = re.compile(
            r'^https?://(?:www\.)?youtube\.com/playlist\?list=[A-Za-z0-9_-]+$'
        )
        return bool(url_regex.match(url))