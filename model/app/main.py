#main router file

from fastapi import APIRouter
from app.routes.chatbotRoutes import router as chatbot_router
from app.services.process_data import setup_database
from dotenv import load_dotenv
from fastapi import FastAPI

router = APIRouter()

@router.get("/")
async def read_root():
    return {"Hello": "World"}

router.include_router(chatbot_router, prefix="/chatbot", tags=["chatbot"])





