from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.prompt import get_agent_executor
import json
router = APIRouter()

class Message(BaseModel):
    sender: str
    text: str

class Conversation(BaseModel):
    conversation: list[Message]

def process_chat_history(chat_data: Conversation) -> list[tuple[str, str]]:
    """Process the chat history into a standardized format."""
    chat_history = [(message.text, message.sender) for message in chat_data.conversation]
    return chat_history

@router.post("/response")
async def chatbot(chat_data: Conversation):
    try:
        # Get the agent executor instance
        agent_executor = get_agent_executor()

        # Process the chat history
        print(chat_data)
        chat_history = process_chat_history(chat_data)
        print(chat_history)

        # Extract the last message as the `input` to the agent
        if chat_data.conversation:
            last_message = chat_data.conversation[-1].text
        else:
            raise HTTPException(status_code=400, detail="Conversation cannot be empty.")

        # Pass the chat history and input to the agent executor
        response = agent_executor.invoke({
            "chat_history": chat_history[:-1],
            "input": last_message, 
            "agent_scratchpad": "" 
        })
        print(response)
        
        if 'output' in response:
            output = response['output'].strip()  # Access 'output' from the dictionary
        else:
            raise HTTPException(status_code=500, detail="Agent did not return an 'output'.")

        # Append the system's response to the conversation
        chat_data.conversation.append(Message(sender="system", text=output))
        print(chat_data)
        return output
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")
