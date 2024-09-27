import { useEffect, useState } from "react";
import axios from "axios";
import '../Chatbot/Chatbot.css';
import { useParams } from "react-router-dom";
import CourseInfoPage from "../CourseInfoNavbar/CourseInfoNavbar";
import { Button } from "react-bootstrap";

// Interfaces for message and conversation
interface ChatMessage {
    sender: "user" | "system";
    text: string;
}

interface ChatConversation {
    id: string;
    title: string;
    conversation: ChatMessage[];
}

const Chatbot = () => {
    const { id } = useParams<{ id: string }>();
    const [conversationId, setConversationId] = useState<string>(''); 
    const [userMessage, setUserMessage] = useState<string>('');
    const [chatHistory, setChatHistory] = useState<ChatConversation[]>([]);
    const [currentConversation, setCurrentConversation] = useState<ChatMessage[]>([]);
    const [conversationTitle, setCoversationTitle] =useState<String>('');
    const [loading, setLoading] = useState<boolean>(false);

    // Fetch chat history when `id` changes
    useEffect(() => {
        if (!id) return;
        setLoading(true);

        axios.get(`http://localhost:4000/courses/${id}/chatbot`)
            .then((response) => {
                setChatHistory(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [id]);

    // Fetch specific conversation when `conversationId` changes
    useEffect(() => {
        if (!conversationId) return;
        console.log("Setting conversationId to:", conversationId);
        setLoading(true);

        axios.get(`http://localhost:4000/courses/${id}/chatbot/${conversationId}`)
            .then((response) => {
                console.log(response.data)
                setCurrentConversation(response.data.conversation);
                console.log(currentConversation)
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [conversationId]);

    // Handle sending user messages
    const handleSend = async () => {
        if (!userMessage) return;
        setUserMessage(""); // Clear input
        // Update conversation with the user's message
        setCurrentConversation((prevConversation) => [
            ...prevConversation, 
            { sender: "user", text: userMessage }  // No need for type assertion here
        ]);
    
        const botResponse: string = await fetchBotResponse(userMessage);
    
        // Update conversation with the bot's response
        setCurrentConversation((prevConversation) => [
            ...prevConversation, 
            { sender: "system", text: botResponse }
        ]);
        };

    // Select an existing conversation
    const selectConversation = async (newConversationId: string) => {
        setLoading(true);
        if(conversationId==='')
        {
            console.log('creating new because nothing exists')
            await createNewConversation(currentConversation);
            setConversationId(newConversationId);
            setLoading(false)
        }
        else{
            console.log('So before conversation ID ', conversationId)
            await axios.put(`http://localhost:4000/courses/${id}/chatbot/${conversationId}`, 
                { title: 'New Conversation', conversation: currentConversation }, 
                { headers: { "Content-Type": "application/json" } }
            )
            .then((response) => {
                setConversationId(newConversationId);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
        }
    };
    
    const deleteConversation= async (TempConverId: string)=>{
        if(conversationId===TempConverId)
        {
            setConversationId('');
            setCurrentConversation([]);
            return
        }
        setLoading(true)
        await axios.delete(`http://localhost:4000/courses/${id}/chatbot/${TempConverId}`)
        .then(async (response) => {
            const res = await axios.get(`http://localhost:4000/courses/${id}/chatbot/`);
            console.log(res.data)
            setChatHistory(res.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error(error);
            setLoading(false);
        });
    }


    const handleNewConversation= async ()=>{
        // if conversation exists then update it with put
        if(conversationId)
        {
            setLoading(true)
            console.log('Here: ', conversationId)
            await axios.put(`http://localhost:4000/courses/${id}/chatbot/${conversationId}`, 
                { title: 'Sample Title', conversation: currentConversation }, 
                { headers: { "Content-Type": "application/json" } }
            )
            .then((response) => {
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
        }
        // if not then create with post
        else if(currentConversation.length!=0){
            setLoading(true)
            console.log(currentConversation)
            await createNewConversation(currentConversation)
            setLoading(false);
        }
        // then createNewConversation
        setConversationId('')
        setCurrentConversation([])
    }

    // Create a new conversation
    const createNewConversation = async (newConversation: ChatMessage[]) => {
        if (newConversation.length === 0) return;
        setLoading(true);
        console.log(newConversation);
        try {
            const response = await axios.post(`http://localhost:4000/courses/${id}/chatbot/`, 
                { title: 'Sample Title', conversation: newConversation },
                { headers: { "Content-Type": "application/json" } }
            );
            const createdConversation = response.data;
            console.log(response.data)
            setChatHistory((prev) => [...prev, createdConversation]);
            setLoading(false);
            console.log('Created new heheh')
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    // Simulate bot response for demo purposes
    const fetchBotResponse = async (message: string): Promise<string> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Bot response to: "${conversationId}"`);
            }, 1000);
        });
    };

    // Loading indicator
    if (loading) {
        return (
            <>
                <CourseInfoPage />
                <div className="content">
                    <div className="courses">
                        <p>Loading...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <CourseInfoPage />
            <div className="main">
                <div className="chat-container">
                    {/* Chat window to display messages */}
                    <div className="chat-window">
                        {currentConversation.map((message, index) => (
                            <div key={index} className={`message ${message.sender}`}>
                                {message.text}
                            </div>
                        ))}
                    </div>

                    {/* Input area to type and send messages */}
                    <div className="input-area">
                        <input
                            type="text"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            placeholder="Type a message"
                        />
                        <button onClick={handleSend}>Send</button>
                    </div>
                </div>

                {/* List of previous conversations */}
                <div className="chat-conversation">
                    <div className="chat-window">
                    <button 
                        className="NewConversationButton" 
                        onClick={() => handleNewConversation()}>
                        + New Conversation
                    </button>
                    </div>
                    {chatHistory.map((conversation, index) => (
                        <div key={index} className="chat-window">
                            <Button
                                onClick={() => selectConversation(conversation.id)}
                                className="conversation-list"
                            >
                                {conversation.id}
                            </Button>
                            <Button onClick={() => deleteConversation(conversation.id)}>
                            X
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Chatbot;
