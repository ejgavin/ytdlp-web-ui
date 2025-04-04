<h1 align="center">Welcome to ytdlp-web-ui 👋</h1>
<p>
  <a href="https://twitter.com/alkissamett" target="_blank">
    <img alt="Twitter: alkissamett" src="https://img.shields.io/twitter/follow/alkissamett.svg?style=social" />
  </a>
</p>

> This project provides a user-friendly web interface for the basic features of the yt-dlp command-line tool. It allows users to download and process videos from various platforms with ease.

![ytdlp-web-ui](image.png)

## Features

- User-friendly interface for yt-dlp
- Video preview functionality
- Queue management for downloads
- Responsive design for desktop and mobile use
- Video downloading from multiple platforms
- Video trimming and cutting capabilities

## Technologies Used

- Frontend:
  - Vite.js
  - React
  - React Player
  - Tailwind CSS
- Backend:
  - Python
  - FastAPI
  - yt-dlp
  - FFmpeg
- Infrastructure:
  - Docker
  - Docker Compose
  - Redis
  - Redis RQ

## Prerequisites

- Docker
- Docker Compose

That's it! Everything runs within Docker containers, so you don't need to install any other dependencies on your system.

## Getting Started

**1. Install Docker:**

[Get Docker](https://docs.docker.com/get-docker/)

**2. Clone the repository:**

```
git clone https://github.com/sametalkis/ytdlp-web-ui.git
cd ytdlp-web-ui
```

**3. Configure the Necessary Files:**

**`redis.conf.example`:**

- If you want to change the password, enter the new password in quotes (do not use special characters).
- If you want to leave it as the default, rename the file by removing `.example` from the filename.

**`gui/env.example`:**

- Enter your own host IP address or leave it as `localhost` and rename the file by removing `.example` from the filename.

**`fastApi/.env.example`:**

- If you have not changed the Redis password, rename the file by removing `.example` from the filename.
- If you have changed the password, enter the new password in this file.

**`fastApi/start.sh.example`:**

- If you have not changed the Redis password, rename the file by removing `.example` from the filename.
- If you have changed the password, enter the new password in this file.

**4. Start the application using Docker Compose:**

```
docker-compose up
```

**5. Open the Web UI:**

[http://localhost:5173](http://localhost:5173)

## Roadmap

I'm constantly working to improve ytdlp-web-ui. Here are some features and improvements I'm planning:

- [ ] Implement a light theme
- [ ] Batch download capability
- [ ] Introduce cookie and proxy options to handle errors on certain sites
- [ ] Implement rate limiting and authentication mechanisms for the API
- [ ] Enhance video format selection with distinct basic and advanced options
- [ ] Make it publishable on the web
- [ ] Add more accessibility features
- [ ] Refactor the codebase to be cleaner and more object-oriented

I welcome suggestions and feedback for these and other improvements!

## Acknowledgements

This project would not have been possible without the following open-source projects:

- [yt-dlp](https://github.com/yt-dlp/yt-dlp): The core functionality for video downloading.

- [FastAPI](https://github.com/tiangolo/fastapi): The web framework for building the API.

- [React](https://github.com/facebook/react): The library for building the user interface.

- [Vite](https://github.com/vitejs/vite): The build tool and development server.

- [Tailwind CSS](https://tailwindcss.com/): The CSS framework for styling.

- [FFmpeg](https://ffmpeg.org/): The multimedia framework for handling video processing.

- [Redis](https://redis.io/): The in-memory data structure store.

- [Redis Queue (RQ)](https://python-rq.org/): The library for queueing jobs and processing them in the background.

A special thanks to all the developers and contributors of these projects for their hard work and dedication to open-source software.

## Author

👤 **Samet Alkis**

- Website: [sametalkis.me](https://sametalkis.me)
- Twitter: [@alkissamett](https://twitter.com/alkissamett)
- Github: [@sametalkis](https://github.com/sametalkis)
- LinkedIn: [@sametalkis](https://linkedin.com/in/sametalkis)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
