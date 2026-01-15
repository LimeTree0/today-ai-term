#!/bin/bash
set -e

# 환경 변수에서 워커 수 가져오기 (기본값: 4)
WORKERS=${WORKERS:-4}

# Gunicorn 실행
exec gunicorn main:app \
    -w ${WORKERS} \
    -k uvicorn.workers.UvicornWorker \
    --bind 0.0.0.0:8000 \
    --access-logfile - \
    --error-logfile - \
    --timeout 120 \
    --keep-alive 5

