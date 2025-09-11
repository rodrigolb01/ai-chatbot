import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { StreamChat } from "stream-chat";   
import OpenAI from "openai";
import {chats, users } from './db/schema.js'
import { db } from "./config/database.js"
import { eq } from "drizzle-orm";
import { ChatCompletionMessageParam } from "openai/resources";

dotenv.config();

//Setup express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Initialize Stream Chat client
const chatClient = StreamChat.getInstance(
    process.env.STREAM_API_KEY!, 
    process.env.STREAM_API_SECRET!
);

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!  
});

// Register user with Stream Chat
app.post('/register-user', async (req: Request, res: Response) : Promise<any> => {
    
    const { name, email } = req.body || {};

        if (!name || !email) {
            return res.status(400).json({error: "Name and email are required"});
        };

    try {
        const userId = email.replace(/[^a-zA-Z0-9]/g, "_"); // Create a user ID from email
        console.log("Registering user with ID:", userId);

        //check if user already exists
        const existingUser = await chatClient.queryUsers({ id: {$eq: userId} });
        console.log("Existing user:", existingUser);

        if(!existingUser.users.length) {
            //upsert user if they do not exist
             const userPayload = {
                id: userId,
                name: name,
                email: email, 
                role: "user", 
            };

            await chatClient.upsertUser(userPayload);
        };

        //check for existing user in the database
        const userInDb = await db
        .select()
        .from(users)
        .where(eq(users.userId, userId));

        if(!userInDb.length) {
            console.log(`User ${userId} does not exist in the database`);
        }

        if (!userInDb.length) {
        console.log(
          `User ${userId} does not exist in the database. Adding them...`
        );
        await db.insert(users).values({ userId, name, email });
      }

        res.status(200).json({userId, name, email });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({error: "Internal server error"});
    };
});

//send message to OpenAI and get response
app.post('/chat', async (req: Request, res: Response): Promise<any> => {
    const { userId, message } = req.body || {};

    if (!userId || !message) {
        return res.status(400).json({error: "User ID and message are required"});
    };   
    
    try{
        //check if user exists in Stream Chat
        const userResponse = await chatClient.queryUsers({id: userId});

        if (!userResponse.users.length) {
            return res.status(404).json({error: "User not found, please register first"});
        };

        //check if user exists in the database
        const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.userId, userId));

        if(!existingUser.length) {
            return res.status(404).json({error: "User not found in database, please register first"});
        }

        //fetch user past messages for context
        const chatHistory = await db
        .select()
        .from(chats)
        .where(eq(chats.userId, userId))
        .orderBy(chats.createdAt)
        .limit(10);

        //format chat history for OpenAI
        const conversation: ChatCompletionMessageParam[] = chatHistory.flatMap(chat => ([
            {role: "user", content: chat.message},
            {role: "assistant", content: chat.reply}
        ]));

        //add latest user message to the conversation
        conversation.push({role: "user", content: message});

        //send message to OpenAI
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: conversation as ChatCompletionMessageParam[]
        });

        const openaiMessage: string = response.choices[0]?.message.content ?? "No response from OpenAI";

        //insert chat to database
       await db.insert(chats).values({
            userId, 
            message,
            reply: openaiMessage
        });

        const channelPayload = {
            name: "ai chat",
            created_by_id: "ai_bot"
        };

        const channel = chatClient.channel("messaging", `chat-${userId}`, channelPayload);

        await channel.create();
        await channel.sendMessage({text: openaiMessage, user: {id: "ai_bot"}});

        res.status(200).json({reply: openaiMessage});
    } catch
    (error) {
        console.error("Error processing chat:", error); 
        return res.status(500).json({error: "Internal server error"});
    };
});

//get a chat history for a user
app.post('/get-messages', async (req: Request, res: Response): Promise<any> => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({error: "User ID is required"});
    };

    try {
        const chatHistory = await db
        .select()
        .from(chats)
        .where(eq(chats.userId, userId));

        return res.status(200).json({messages: chatHistory});
    } catch (error) {
        console.error("Error fetching chat history:", error);
        return res.status(500).json({error: "Internal server error"});
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));