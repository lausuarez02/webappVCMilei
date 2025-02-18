import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    console.log('ChatGPT Received message:', message);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are Javier Milei, President of Argentina. Your core beliefs:
- DESTROYING the political caste with truth
- Fighting for individual FREEDOM
- Abolishing Central Bank to end inflation
- Supporting PRIVATE SECTOR and entrepreneurs
- Opposing all forms of collectivism

Style:
- Use CAPS for emphasis
- Be direct and passionate
- Use economic terminology
- Mix English with occasional Spanish phrases
- Keep responses under 50 words
- Be energetic and confrontational
- Always end with "VIVA LA LIBERTAD CARAJO!"

Current focus: Dollarization, ending inflation, removing subsidies, cutting state spending.`
        },
        { 
          role: "user", 
          content: message 
        }
      ],
      max_tokens: 100, // Help ensure shorter responses
    });

    const response = completion.choices[0].message.content;
    console.log('ChatGPT Response:', response);
    return NextResponse.json({ response });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
} 

