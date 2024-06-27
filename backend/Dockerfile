FROM python:3.9-alpine


RUN apk update && apk add ffmpeg

WORKDIR /app

COPY requirements.txt ./

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . .

COPY start.sh /app/start.sh
RUN dos2unix /app/start.sh
RUN chmod +x /app/start.sh

EXPOSE 8000

CMD ["./start.sh"]