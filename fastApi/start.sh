#!/bin/sh
uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
rq worker-pool --url redis://:<REDIS_PASS>@redis:6379 task_queue -n 25