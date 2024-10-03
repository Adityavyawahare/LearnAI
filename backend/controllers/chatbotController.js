import courseModel from '../models/courseModel.js'
import courseInfoModel from '../models/courseInfoModel.js';
import mongoose from 'mongoose';

export const getChatHistory= async (req, res)=>{
    const {id} = req.params
    const course=await courseInfoModel.find({course_id: id})
    if(!course){
        return res.status(404).json({error:"No such course"})
    }
    res.status(200).json(course[0].chatbot)
}

export const getChatConversation = async (req, res) => {
    const { id, conversationId } = req.params;
    const course = await courseInfoModel.findOne({ course_id: id});
    if (!course) {
        return res.status(404).json({ error: "No such course" });
    }

    const conversation = course.chatbot.find(convo => convo.id.toString() === conversationId);
    if (!conversation) {
        return res.status(404).json({ error: "No such conversation" });
    }

    res.status(200).json(conversation);
};


export const updateChatConversation = async (req, res) => {
    const { id, conversationId } = req.params;
    const { title, conversation } = req.body; 
    console.log('In backend', title, conversation) 

    try {
        const course = await courseInfoModel.findOneAndUpdate(
            { course_id: id, 'chatbot.id': conversationId }, 
            { 
                $set: { 
                    'chatbot.$.title': title,           
                    'chatbot.$.conversation': conversation 
                }
            },
            { new: true }
        );

        if (!course) {
            return res.status(400).json({ error: 'No such course or conversation' });
        }

        res.status(200).json(course.chatbot);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the conversation' });
    }
};

export const updateChatHistory = async (req, res) => {
    const { id } = req.params;

    const course = await courseInfoModel.findOneAndUpdate(
        { course_id: id },
        { $set: { 'chatbot': req.body.history } },
        { new: true }
    );

    if (!course) {
        return res.status(400).json({ error: 'No such course' });
    }

    res.status(200).json(course);
};

export const newChatHistory = async (req, res) => {
    const { id } = req.params;

    const newConversation = {
        id: new mongoose.Types.ObjectId(),
        title: req.body.title || 'New Conversation',
        conversation: req.body.conversation
    };

    try {
        const course = await courseInfoModel.findOneAndUpdate(
            { course_id: id },
            { $push: { 'chatbot': newConversation } },
            { new: true }
        );

        if (!course) {
            return res.status(400).json({ error: 'No such course' });
        }

        res.status(200).json(newConversation);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the new conversation' });
    }
};

export const deleteChatHistory = async (req, res) => {
    const { id, conversationId } = req.params;

    console.log(id, conversationId);
    
    try {
        const course = await courseInfoModel.findOneAndUpdate(
            { course_id: id },
            { $pull: { chatbot: { id: conversationId } } },
            { new: true }
        );

        if (!course) {
            return res.status(404).json({ error: 'No such course found' });
        }

        res.status(200).json({ message: 'Conversation deleted successfully', course });
    } catch (error) {
        console.error('Error deleting conversation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
