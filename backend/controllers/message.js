import { AppError } from "../utils/AppError.js";
import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
export const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if(!message){
        return next(new AppError(`Please enter the message`, 400));
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation=await Conversation.create({
        participants:[senderId,receiverId]
      })
    }

    const newMessage=new Message({
        senderId,
        receiverId,
        message
    })

    

    if(newMessage){
        conversation.messages.push(newMessage._id)
    }

    await Promise.all([conversation.save(),newMessage.save()]);
    
    res.status(201).json(newMessage);

  } catch (error) {
    console.log("Error while sending the message", error);
    return next(new AppError(`Internal Server Error`, 500));
  }
};

export const getMessages=async(req,res,next)=>{
    try {
        const {id:userToChatId}=req.params;
        const senderId=req.user._id;
        const conversation=await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]}
        }).populate("messages");

        if(!conversation){
            res.status(200).json([]);
        }

        res.status(200).json(conversation.messages);

    } catch (error) {
        console.log("Error while getting the messages", error);
        return next(new AppError(`Internal Server Error`, 500));
    }
}
