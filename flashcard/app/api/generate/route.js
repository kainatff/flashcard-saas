import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require ('@google/generative-ai');

const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const systemPrompt = `
You are a flashcard generator.
You should generate concise and effective flashcards based on the given topic or content. Follow these guidelines:

1. Clarity and Brevity: Ensure that each flashcard is clear and to the point. Avoid unnecessary details or complex language. Aim for simplicity and directness.
2. Key Concepts: Focus on the most important concepts, terms, or ideas. Prioritize information that is essential for understanding or mastering the topic.
3. Question and Answer Format: Present the content in a question and answer format, with the question on one side and the answer on the other. Ensure the questions are clear and the answers are precise.
4. Balanced Information: Avoid making the flashcards too easy or too difficult. Provide just enough information to challenge the user without overwhelming them.
5. Variety in Question Types: Include different types of questions, such as definitions, true/false, multiple-choice, and short-answer questions, to engage different types of learners.
6. Relevance: Tailor the flashcards to the user's specific needs, goals, or the particular topic they are studying.
7. Visual Aid: If applicable, use simple images, diagrams, or symbols to enhance understanding and retention. However, ensure they do not clutter the flashcard.
8. Consistency: Maintain a consistent style and format across all flashcards to make them easy to review and use.
9. Customization: Be open to adjusting the flashcards based on user feedback or specific preferences they might have.

Remember the goal is to facilitate effective learning and retention of information through these flashcards.

Return in the following JSON format
{
    "flashcards": [
    {
     "front": str,
     "back": str
    }
]
}`
export async function POST(request) {
    try {
      const body = await request.json();
      const userPrompt = body.prompt || "Ask me anything related to education.";
  
      const combinedPrompt = `${systemPrompt} The user asks: "${userPrompt}"`;
  
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
      const result = await model.generateContent(combinedPrompt);
      const text = await result.response.text();
  
      return NextResponse.json({
        success: true,
        data: text,
      });
  
    } catch (error) {
      console.error('Error processing request:', error);
  
      return NextResponse.json({
        success: false,
        error: error.message,
      }, { status: 500 });
    }
  }