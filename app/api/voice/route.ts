import { NextResponse } from 'next/server';

const VOICE_ID = '7JMaFq0McdqBaZy0htfN'; // Replace with your voice ID

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    console.log('ElevenLabs Received text:', text);
    
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': process.env.ELEVEN_LABS_API_KEY || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      }),
    });

    console.log('ElevenLabs Response status:', response.status);
    const audioBuffer = await response.arrayBuffer();
    console.log('Audio buffer size:', audioBuffer.byteLength);
    
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });
  } catch (error) {
    console.error('ElevenLabs API error:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}