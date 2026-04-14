FROM docker.io/python:3.14-slim

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

# Create non-root user
RUN groupadd -r app && useradd -r -g app app

WORKDIR /app

# Install production dependencies only
COPY backend/pyproject.toml ./
RUN uv pip install --no-cache-dir --system .

COPY backend/main.py ./

USER app

EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
