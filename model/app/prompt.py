# app/agent.py
from langchain.agents import AgentExecutor

# Global variable for the agent executor
agent_executor = None

def set_agent_executor(executor: AgentExecutor):
    global agent_executor
    agent_executor = executor

def get_agent_executor():
    return agent_executor