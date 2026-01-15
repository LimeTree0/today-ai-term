# Python 3.12 베이스 이미지 사용
FROM python:3.12-slim AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 시스템 패키지 업데이트 및 uv 설치에 필요한 패키지 설치
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# uv 설치
RUN pip install --no-cache-dir uv

# 의존성 파일 복사
COPY api/pyproject.toml ./
COPY api/uv.lock* ./

# uv를 사용하여 의존성 설치 (lock 파일이 있으면 사용, 없으면 자동 생성)
RUN uv sync --no-dev

# 런타임 스테이지
FROM python:3.12-slim

# 작업 디렉토리 설정
WORKDIR /app

# 시스템 패키지 업데이트
RUN apt-get update && apt-get install -y --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# builder 스테이지에서 Python 환경 복사
COPY --from=builder /app/.venv /app/.venv

# 애플리케이션 파일 복사
COPY api/main.py api/ai_term_repository.py api/ai_term_service.py ./
COPY api/terms.json ./
COPY api/static ./static

# Entrypoint 스크립트 복사 및 실행 권한 부여
COPY api/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Python 경로 설정
ENV PATH="/app/.venv/bin:$PATH"

# 포트 노출
EXPOSE 8000

# 환경 변수 설정
ENV PYTHONUNBUFFERED=1
ENV WORKERS=4

# Entrypoint 스크립트 실행
ENTRYPOINT ["/app/entrypoint.sh"]

