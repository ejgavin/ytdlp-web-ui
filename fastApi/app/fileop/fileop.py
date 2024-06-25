import os
import subprocess
import urllib.parse

class FileOp:
    def __init__(self, filepath):
        self.filepath = filepath

    @staticmethod
    def find_largest_file(filepath):
        base_path = "/app/video"
        new_file_path = os.path.join(base_path, filepath)
        if not os.path.exists(new_file_path):
            raise FileNotFoundError(f"The filepath {new_file_path} does not exist.")
        largest_file_name = ""
        largest_file = None
        largest_size = 0
        
        for root, dirs, files in os.walk(new_file_path):
            for file in files:
                file_path = os.path.join(root, file)
                file_size = os.path.getsize(file_path)
                if file_size > largest_size:
                    largest_size = file_size
                    largest_file = file_path
                    largest_file_name = os.path.basename(largest_file)

        if largest_file is None:
            raise FileNotFoundError("No files found in the directory.")
        else:
            encoded_video_name = urllib.parse.quote(largest_file_name)
            return largest_file , encoded_video_name

    @staticmethod
    def cut_video(file_path, start, end):
        basename_without_ext = os.path.splitext(os.path.basename(file_path))[0]
        basename_ext = os.path.basename(file_path).split('.', 1)[1]
        output_name = f'{basename_without_ext}_{start}_{end}.{basename_ext}'
        output_dir = os.path.join(os.path.dirname(file_path), "cut")
        os.makedirs(output_dir, exist_ok=True)
        output_path = os.path.join(output_dir, output_name)
        
        try:
            command = [
                'ffmpeg', '-i', file_path, '-ss', str(start), '-to', str(end),
                '-c', 'copy', output_path
            ]
            subprocess.run(command, check=True)
            print("Process completed successfully.")
            return output_path
        except subprocess.CalledProcessError as e:
            print(f'Error: {e}')
            raise