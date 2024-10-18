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

const twilio = require('twilio');


//Google cloud services
const axios = require('axios');
const textToSpeech = require('@google-cloud/text-to-speech');
const ttsClient = new textToSpeech.TextToSpeechClient();

async function generateTextResponse(userInput, conversationHistory) {
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
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data.choices[0].message.content;  // Return the text part of the response
    } catch (error) {
        console.error('Error fetching text from OpenAI:', error.message);
        throw error;  // Re-throw to handle it in the main function
    }
}

// Function to convert text response to audio using Google Text-to-Speech
async function generateAudioResponse(textResponse) {
    try {
        const request = {
            input: {text: textResponse},
            voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
            audioConfig: {audioEncoding: 'MP3'},
        };
        const [response] = await ttsClient.synthesizeSpeech(request);
        return response.audioContent;  // Return the audio content
    } catch (error) {
        console.error('Error converting text to speech:', error.message);
        throw error;  // Re-throw to handle it in the main function
    }
}

async function generateResponse(userInput, conversationHistory) {
    try {
        const textResponse = await generateTextResponse(userInput, conversationHistory);
        const audioContent = await generateAudioResponse(textResponse);

        return {
            text: textResponse,
            audioContent: audioContent  // Assuming the front end will handle Blob or similar for audio playback
        };
    } catch (error) {
        console.error('Error in generating response:', error.message);
        return "TRANSFER_TO_MANAGER";  // Fallback action
    }
}

