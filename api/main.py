from fastapi import Depends
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse

from ai_term_repository import AITermRepository
from ai_term_service import AITermService

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")


def get_ai_term_repository() -> AITermRepository:
    return AITermRepository()


def get_ai_term_service(
        repo: AITermRepository = Depends(get_ai_term_repository),
) -> AITermService:
    return AITermService(repo)


@app.get("/api/ai-term/today")
async def today_ai_term(
        ai_term_service: AITermService = Depends(get_ai_term_service),
):
    return ai_term_service.get_today_ai_term("123")


@app.get("/")
async def index():
    return FileResponse("static/index.html")


@app.get("/api/preview/pdf")
async def preview_pdf(file_name: str):
    print("file_name : ", file_name)
    return FileResponse(f"static/data/term/{file_name}")
