import { useEffect, useState } from "react";
import axios from "axios";
import '../Chatbot/Chatbot.css'
import { useParams } from "react-router-dom";
import CourseInfoPage from "../CourseInfoNavbar/CourseInfoNavbar";

interface ChatMessage {
    sender: "user" | "system";
    text: string;
}

interface ChatConversation {
    id : String,
    conversation: ChatMessage[]
}

const Chatbot= ()=>{
    const { id } = useParams<{ id: string }>();
    const [userMessage, setUserMessage] =useState('');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [loading, setLoading]= useState(false);
    useEffect(()=>{
        setLoading(true);
        axios
            .get(`http://localhost:4000/courses/${id}/chatbot/history`)
            .then((response)=>{
                console.log(response.data[0].history)
                setChatHistory(response.data[0].history)
                setLoading(false)
            })
            .catch((error)=>{
                console.log(error)
                setLoading(false)
            })
    },[id])


    const handleSend = async () => {
        if (!userMessage) return;
    
        setChatHistory((chatHistory) => [...chatHistory, { sender: "user", text: userMessage }]);
    
        const botResponse: string = await fetchBotResponse(userMessage);  // Corrected
    
        setChatHistory((chatHistory) => [...chatHistory, { sender: "system", text: botResponse }]);

        
    
        setUserMessage("");
    };

    const fetchBotResponse = async (message: string): Promise<string> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Bot response to: "${message}"`);
            }, 1000);
        });
    };
    
    if (loading) {
        return (
            <>
                <CourseInfoPage/>
                <div className="content">
                    <div className="courses">
                        <p>loading......</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <CourseInfoPage />
            <div className="chat-container">
                <div className="chat-window">
                    {chatHistory.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        {message.text}
                    </div>
                    ))}
                </div>
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
        </>
    );
}

export default Chatbot