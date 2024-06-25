#!/bin/sh
uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
rq worker-pool --url redis://:k7fkuXq9Kf8QDW88KiFE@redis:6379 task_queue -n 25