import { GoogleGenAI } from '@google/genai'
import { ERROR_MESSAGES } from '../constants/messages.js'

let ai = null

const getClient = () => {
    if (!process.env.GEMINI_API_KEY) {
        const error = new Error(ERROR_MESSAGES.AI_NOT_CONFIGURED)
        error.statusCode = 500
        throw error
    }

    if (!ai) {
        ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
    }

    return ai
}

async function main(prompt) {
    if (!prompt || !prompt.trim()) {
        const error = new Error(ERROR_MESSAGES.PROMPT_REQUIRED)
        error.statusCode = 400
        throw error
    }

    const response = await getClient().models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt.trim()
    })

    const content = response?.text?.trim()
    if (!content) {
        const error = new Error(ERROR_MESSAGES.AI_EMPTY_RESPONSE)
        error.statusCode = 502
        throw error
    }

    return content
}

export default main
