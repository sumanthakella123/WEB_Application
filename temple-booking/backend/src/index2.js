import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import axios from 'axios';
import { fileURLToPath } from 'url';

// Configuration
const ELEVEN_LABS_API_KEY = 'sk_973d96eaba952c7324ff728109a19bfe1dc45e81d0d3e20c';

const app = express();
const port = 5000;

// Conversation history template
const conversationHistoryTemplate = [
    {
        role: 'system',
        content:
            'You are Neela, a friendly and knowledgeable phone call assistant from the Albany Hindu Temple in Albany, NY. ' +
            'Provide concise and helpful responses that are no longer than 2 lines. ' +
            'If there are any questions that are not related to temple just tell them you can only answers related to the temple. ' +
            'for anyone who want to make puja booking, coollect their name, email address and Puja Name'+
            'If you cannot answer a question or if the user asks for a manager or human, respond with exactly "TRANSFER_TO_MANAGER" as your message. ' +
            'If you detect frustration or multiple repeated questions from the user, respond with "TRANSFER_TO_MANAGER".',
    },
    {
        role: 'assistant',
        content: "Hello, I'm Neela from Albany Hindu Temple. How can I assist you today?",
    },
];    