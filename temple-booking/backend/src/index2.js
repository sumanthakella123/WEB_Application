import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import axios from 'axios';
import { promises as fs } from 'fs';
import { createReadStream, existsSync, mkdirSync, writeFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import pkg from 'twilio';
const { twiml: { VoiceResponse } } = pkg;

// Get current directory name (equivalent to __dirname in CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const ELEVEN_LABS_API_KEY = 'sk_973d96eaba952c7324ff728109a19bfe1dc45e81d0d3e20c';
const OPENAI_API_KEY = 'sk-proj-7svNJygbiYzL8Kqr1qUkT3BlbkFJqDPe8H1gbOSOIXI2xfDY';
const MANAGER_PHONE = '5189410761';

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    session({
        secret: 'supersecretkey',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 30 * 60 * 1000 },
    })
);

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

// Helper function: Generate TTS audio
async function textToSpeech(text, sessionId) {
    try {
        const response = await axios.post(
            `https://api.elevenlabs.io/v1/text-to-speech/cgSgspJ2msm6clMCkdW9`,
            {
                text: text,
                model_id: 'eleven_turbo_v2_5',
                voice_settings: { stability: 0.5, similarity_boost: 0.75 },
            },
            {
                headers: {
                    'xi-api-key': ELEVEN_LABS_API_KEY,
                    Accept: 'audio/mpeg',
                    'Content-Type': 'application/json',
                },
                responseType: 'arraybuffer',
            }
        );

        const audioPath = join(__dirname, 'audio', `${sessionId}.mp3`);
        writeFileSync(audioPath, response.data);
        return audioPath;
    } catch (error) {
        console.error('Error in textToSpeech:', error.message);
        return null;
    }

}

async function generateResponse(userInput, conversationHistory) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',
                messages: conversationHistory,
                max_tokens: 50,
                temperature: 0.7,
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error in generateResponse:', error.message);
        return "TRANSFER_TO_MANAGER";
    }
}

// Helper function: Clean up audio files
async function cleanupAudioFile(sessionId) {
    const audioPath = join(__dirname, 'audio', `${sessionId}.mp3`);
    try {
        if (existsSync(audioPath)) {
            unlinkSync(audioPath);
        }
    } catch (error) {
        console.error('Error cleaning up audio file:', error);
    }
}
// Helper function: Clean up audio files
async function cleanupAudioFile(sessionId) {
    const audioPath = join(__dirname, 'audio', `${sessionId}.mp3`);
    try {
        if (existsSync(audioPath)) {
            unlinkSync(audioPath);
        }
    } catch (error) {
        console.error('Error cleaning up audio file:', error);
    }
}
