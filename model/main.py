import uvicorn
from fastapi import FastAPI
from app.main import router as main_router  
from app.services.process_data import setup_database
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize the agent
    print('Initializing agent...')
    setup_database()
    print('Agent initialized')

    yield  # Allows the app to continue running

    # Shutdown: You can add cleanup tasks here if needed
    print('Shutting down...')

# Pass the lifespan context manager to the FastAPI app
app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(main_router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)
