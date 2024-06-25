from rq import Queue, Connection, SimpleWorker
from redis import Redis
import os
from dotenv import load_dotenv

load_dotenv()
REDIS_PASS = os.getenv('REDIS_PASS')

redis_conn = Redis(host="redis", port="6379", password=REDIS_PASS)
task_queue = Queue("task_queue", connection=redis_conn)


